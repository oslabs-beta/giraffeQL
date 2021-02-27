import Head from 'next/head';
import Image from 'next/image'
import { useRouter } from 'next/router';

import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/state.js';

import getUser from '../controller/getUser.js';

import Navbar from '../components/Navbar.js';
import DiagramModal from '../components/diagrams/DiagramModal.js';
import DiagramPreview from '../components/diagrams/DiagramPreview.js';
import FolderModal from '../components/diagrams/FolderModal.js';
import EditModal from '../components/diagrams/EditModal.js';

import { parseCookies } from 'nookies';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  position: fixed;
  display: block;
  bottom: 5%;
  border-color: #12b3ab;
`;

const Diagrams = (props) => {

  const router = useRouter();

  const { user, storeUser, logout, diagrams, storeDiagrams } = useContext(UserContext);

  const [displayDiagrams, setDiagrams] = useState([])

  const [currentSortMode, setSortMode] = useState('newest');
  const [currentSortDate, setSortDate] = useState('last updated');

  const [showFolders, expandFolders] = useState(false);
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState({name: ''});
  const [activeDiagram, setActiveDiagram] = useState('');

  useEffect(() => {
    
    if (props.user.hasOwnProperty('user')){
      if (props.user.user.hasOwnProperty('diagrams')){
        const newDiagrams = [...props.user.user.diagrams];
        storeDiagrams(newDiagrams);
        setDiagrams(newDiagrams);
      }
      if (props.user.user.hasOwnProperty('folders'))
        setFolders(props.user.user.folders);
    }
    
    if (props.user.authorization === null || !props.user.hasOwnProperty('user')) return logout();
    if (props.user.user.username === user.username) return;
    if (props.user) {
      storeUser(props.user.user);
      storeDiagrams(props.user.user.diagrams);
      setDiagrams(props.user.user.diagrams);
      setFolders(props.user.user.folders);
    }
    else logout();

  }, []);

  useEffect(() => {
    const handleStart = () => { setPageLoading(true); };
    const handleComplete = () => { setPageLoading(false); };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  useEffect(() => {

    if (!props.user.authorization)
      return;

    const user = getUser(props.user.authorization)
      .then(data => storeDiagrams(data.user.diagrams));

  }, [currentSortMode, currentSortDate, activeFolder]);

  useEffect(() => {

    if (activeFolder.name !== '') return setDiagrams(folderDiagrams([...diagrams])) 

    if (currentSortMode === 'newest') setDiagrams(mostRecentDiagrams([...diagrams]))
    if (currentSortMode === 'oldest') setDiagrams(oldestDiagrams([...diagrams]))
    if (currentSortMode === 'favorites') setDiagrams(favoriteDiagrams([...diagrams]))    
    if (currentSortMode === 'alphabetical') setDiagrams(alphabeticalDiagrams([...diagrams]))

  }, [diagrams]);

  const [newDiagram, setNewDiagram] = useState(false)
  const [newFolder, setNewFolder] = useState(false);
  const [newEdit, setNewEdit] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState(null);
  const [URI, setURI] = useState('');

  const selectDiagram = (id) => {
    const href = {pathname: 'canvas', query: {diagram: id, name, description}};
    router.push(href, 'diagrams');
  }

  const deleteDiagram = (id) => {
    const fetchURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://giraffeql.io'
    fetch(`${fetchURL}/diagrams/${id}`, {method: 'DELETE', headers: {'Content-Type': 'application/json'}})
      .then(res => res.json())
      .then(data => storeDiagrams(data.diagrams));
  }

  const toggleEdit = (data) => {
    setNewEdit(true);
    setActiveDiagram(data);
  }

  const checkURLStatus = () => {

    let path = '';

    if (!URI.includes('postgres://')) path = 'postgres://' + URI;
    else path = URI;

    const href = { pathname: '/canvas', query: { data: [path], name, description } }

    router.push(href, 'diagrams')
  }

  const newProject = () => {
    const href = { pathname: '/canvas', query: { name, description } }
    router.push(href, 'diagrams')
  }

  const sortModes = ['newest', 'oldest', 'favorites', 'alphabetical'];
  const sortDates = ['last updated', 'created'];

  const mostRecentDiagrams = (arr) => { 
    return arr.slice().sort(function (a, b) {

      const datemodifier = currentSortDate === 'last updated' ? 'updatedAt' : 'createdAt';

      if (a[datemodifier] < b[datemodifier]) return 1;
      if (a[datemodifier] > b[datemodifier]) return -1;
      return 0;
    })
  }

  const oldestDiagrams = (arr) => {
    return arr.slice().sort(function (a, b) {

      const datemodifier = currentSortDate === 'last updated' ? 'updatedAt' : 'createdAt';

      if (a[datemodifier] > b[datemodifier]) return 1;
      if (a[datemodifier] < b[datemodifier]) return -1;
      return 0;
    });
  }

  const favoriteDiagrams = (arr) => {
      return arr.filter((diagram) => {
      if (diagram.favorite) return diagram;
    })
  }

  const folderDiagrams = (arr) => {
    return arr.filter((diagram) => {
    if (diagram.folder === activeFolder.name) return diagram;
    })
  }

  const alphabeticalDiagrams = (arr) => {
    return arr.slice().sort(function (a, b) {
        return (a.diagramName.toUpperCase() < b.diagramName.toUpperCase()) ? -1 : (a.diagramName.toUpperCase() > b.diagramName.toUpperCase()) ? 1 : 0;
    });
  }

  const updateDiagram = (data) => {

    const body = {
      user: user._id,
      diagramName: data.diagramName,
      description: data.description,
      diagramId: data._id,
      folder: data.folder,
      tables: data.tables
    };

    const fetchURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://giraffeql.io';
    fetch(`${fetchURL}/diagrams`, { method: 'PUT', headers: { 'Content-Type': 'Application/JSON' }, body: JSON.stringify(body)})
        .then(res => res.json())
        .then(data => {
          const newDiagrams = [...displayDiagrams];
          const target = newDiagrams.findIndex(diagram => diagram.diagramName === data.diagramName);

          newDiagrams.splice(target, 1, data.diagram);
          setDiagrams(newDiagrams);
        });
  }

  const createFolder = (folder) => {

    const body = {
      oAuthId: props.user.user.oAuthId,
      folder
    };
    
    const fetchURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://giraffeql.io';
    fetch(`${fetchURL}/user/folders`, {method: 'PUT', headers: { authorization: props.user.authorization, 'Content-Type': 'Application/JSON'}, body: JSON.stringify(body)})
        .then(res => res.json())
        .then(data => setFolders(data.folders));
  }

  const deleteFolder = (folder) => {

    const body = {
      oAuthId: props.user.user.oAuthId,
      folder
    };
    
    const fetchURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://giraffeql.io';
    fetch(`${fetchURL}/user/folders`, {method: 'DELETE', headers: { authorization: props.user.authorization, 'Content-Type': 'Application/JSON'}, body: JSON.stringify(body)})
        .then(res => res.json())
        .then(data => setFolders(data.folders));
  }

  const diagrammodal = newDiagram ? <DiagramModal message={props.message} setPageLoading={setPageLoading} name={name} setName={setName} description={description} setDescription={setDescription} URI={URI} setURI={setURI} checkURLStatus={checkURLStatus} newProject={newProject} /> : '';
  const foldermodal = newFolder ? <FolderModal createFolder={createFolder} setNewFolder={setNewFolder} /> : ''; 
  const editmodal = newEdit ? <EditModal folders={folders} diagram={activeDiagram} updateDiagram={updateDiagram} /> : '';

  return (
    <div id='diagram'>

      <Head>
        <title>giraffeQL</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      
      <Navbar />

      {diagrammodal}
      {foldermodal}
      {editmodal}

      <div id='preventClick' onClick={() => {setNewDiagram(false); setNewFolder(false); setNewEdit(false)}} style={{width: '100vw', height: '100vh', position: 'fixed', zIndex: `${newDiagram || newFolder || newEdit ? '9' : '-10'}`, backgroundColor: `${newDiagram || newFolder || newEdit ? 'rgba(0,0,0,.25)' : 'transparent'}`}} />

      <div id='browsediagrams' style={{filter: `${newDiagram || newFolder || newEdit ? 'blur(5px)' : ''}`, transition: '0s'}} >

        <div id='diagramoptions'>
          <div className='header' style={{borderTopLeftRadius: '8px', borderRight: '2px solid #7c81cf'}} >Options</div>
          <button onClick={() => setNewDiagram(!newDiagram)} style={{color: '#12b3ab'}} ><div style={{display: 'flex'}} ><div style={{marginRight: '8px'}} ><Image src='/plus.svg' width={10} height={10} /></div> New Diagram</div></button>
          
          <hr />

          <h1>Projects</h1>
          <button onClick={() => setActiveFolder({name: ''})} ><div style={{display: 'flex'}} ><div style={{marginRight: '8px'}} ><Image className='icon' src='/showall.svg' width={10} height={10} /></div> All Projects</div></button>
          <button onClick={() => expandFolders(!showFolders)} style={{borderBottom: '1px solid #e1e8f0'}} ><div style={{display: 'flex'}} ><div style={{marginRight: '8px'}} ><Image className='icon' src='/hamburger.svg' width={10} height={10} /></div> My Folders</div></button>
          
          {!showFolders ? '' : <ul id='folder' style={{backgroundColor: '#f1f6f9'}} >{folders.map((folder, i) => <li key={`folder#${i}`} style={{display: 'flex'}} ><button onClick={() => setActiveFolder({name: folder.name})} style={{borderTop: `${activeFolder.name === folder.name ? '1px solid #0373fc' : '1px solid transparent'}`, borderBottom: `${activeFolder.name === folder.name ? '1px solid #0373fc' : '1px solid transparent'}`}} ><div style={{marginRight: '8px'}} ><Image className='icon' src={activeFolder.name === folder.name ? '/openfolder.svg' : '/folder.svg'} width={10} height={10} /></div>{folder.name} <div onClick={(e) => {e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); deleteFolder({name: folder.name});}} style={{position: 'absolute', right: '0', marginRight: '5%', display: 'flex', alignItems: 'center'}} ><Image className='icon' src='/delete.svg' width={18} height={18} /></div> </button> </li>)}    <button onClick={() => setNewFolder(true)} style={{color: '#12b3ab'}}><div style={{display: 'flex'}} ><div style={{marginRight: '8px'}} ><Image src='/plus.svg' width={10} height={10} /></div> New Folder</div></button>    </ul>}

          <hr />

          <h1>Quick Start</h1>
          <button onClick={() => router.push({ pathname: '/canvas', query: { data: ['postgres://lfawycfl:yc837PGh-S4jP4YIHJlv6Ldh7C7P2xJw@suleiman.db.elephantsql.com:5432/lfawycfl'], name: 'Star Wars Example', description: 'A long time ago, in a galaxy far away...' } }, 'canvas')} ><div style={{display: 'flex'}} ><div style={{marginRight: '8px'}} ><Image className='icon' src='/starwars.svg' width={12} height={12} /></div> Example Database</div></button>
        </div>

        <div id='containerheader'>
          <div className='header' style={{borderTopRightRadius: '8px'}} >My Diagrams</div>

          <div id='sort' >Sort

            <select onChange={(e)=>setSortMode(e.target.value)} >
              {sortModes.map((sortMode, i) => <option key={`sortModes#${i}`} value={sortMode} >{sortMode}</option> )}
            </select>

            by

            <select onChange={(e)=>setSortDate(e.target.value)} >
              {sortDates.map((sortDate, i) => <option key={`sortDates#${i}`} value={sortDate} >{sortDate}</option> )}
            </select>
          </div>

          <div id='diagramcontainer'>
            {!displayDiagrams.length ? <h1 style={{fontSize: '18px'}}>Nothing here... yet!</h1> : displayDiagrams.map((diagram, i) => <DiagramPreview name={diagram.diagramName} description={!diagram.description ? '' : diagram.description} updated={diagram.updatedAt} favorite={diagram.favorite} color={diagram.color} id={diagram._id} key={`diagram#${diagram._id}`} data={diagram} index={i} selectDiagram={selectDiagram} deleteDiagram={deleteDiagram} toggleEdit={toggleEdit} />)}
          </div>

          <h1 id='currview' >Currently viewing {activeFolder.name === '' ? 'all' : activeFolder.name}.</h1>

        </div>

      </div>

      {pageLoading ? <BeatLoader id='beatloader' css={override} color='#12b3ab' pageLoading={pageLoading} size={20} /> : null}

      <style jsx>{`

        *{
          font-family: 'Inter', sans-serif;
          transition: all .3s ease;
        }

        #diagram{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          width: 100vw;
          height: 100vh;
          background-color: #edf2f7;
        }

        #browsediagrams{
          display: flex;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06), 0px 0px 16px 0px rgba(0,0,0,.1);
          border-radius: 8px;
          width: 80%;
          height: 80%; 
          background-color: white;
          text-align: center;
          vertical-align: center;
        }
        
        #diagramoptions{
          width: 30%;
        }

        #folder{
          margin: 0;
          max-height: 35%;
          overflow: auto;

          ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
          }
          
          ::-webkit-scrollbar-track {
              background: transparent;
          }
          
          ::-webkit-scrollbar-thumb {
              background: #454954;
              border-radius: 16px;
              border-right: none;
              border-left: none;
          }
        }

        .header{
          font-weight: bold;
          color: white;
          background-color: #5661b3;
          padding: 16px;
        }

        h1{
          color: #b2becc;
          font-size: 12px;
          text-align: left;
          margin-left: 8px;
        }

        button{
          position: relative;
          font-size: 16px;
          text-align: left;
          background-color: white;
          padding: 16px;
          border: none;
          outline: none;
          width: 100%;
          z-index: 9;
          color: #4a5668;
          display: flex;
          justify-content: flex-start;

          &:hover{
            background-color: #f7fafc;
            color: #546ad5;
            cursor: pointer;
          }
        }

        hr{
          width: 100%;
          border: 0;  
          height: 1px;
          background-color: #e1e8f0;
          margin: 0;
        }

        #containerheader{
          width: 100%;
        }

        #sort{

          font-size: 12px;
          float: right;
          margin-right: 8%;

          input{
            width: 64px;
            border: none;
            background-color: transparent;
          }

          select{
            border: none;
            background-color: transparent;
            font-size: 12px;

            &:active{
              border: none;
            }
          }
        }

        #diagramcontainer{
          display: flex;
          align-items: center;
          justify-content: center;
          // background-color: #edf2f7;
          width: 98%;
          height: 85%;
          flex-wrap: wrap;
          overflow: auto;
        }

        #currview{
          margin-top: -1px;
          margin-right: 1em;
          float: right;
        }

      `}</style>
        
    </div>
  );
}

export default Diagrams;

export async function getServerSideProps(ctx) {

  const props = {};
  const query = ctx.query;

  const { authorization } = parseCookies(ctx);
  const { token } = ctx.query
  props.user = await getUser(authorization || token);
  
  if (query.error)
    props.error = query.error;

  if (query.message)
    props.message = query.message;

  return {props};
}
