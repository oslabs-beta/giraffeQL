import Head from 'next/head';
import { useRouter } from 'next/router';

import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/state.js';

import getUser from '../controller/getUser.js';

import Navbar from '../components/Navbar.js';
import DiagramModal from '../components/diagrams/DiagramModal.js';
import DiagramPreview from '../components/diagrams/DiagramPreview.js';

import { parseCookies } from 'nookies';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin-top: 10px;
  border-color: #12b3ab;
`;

const Diagrams = (props) => {

  const router = useRouter();

  const { user, storeUser, logout, diagrams, storeDiagrams } = useContext(UserContext);

  useEffect(() => {
    
    //TODO: avoid re-render while still updating diagrams in state
    if (props.user.user.hasOwnProperty('diagrams')){
      const newDiagrams = [...props.user.user.diagrams];
      storeDiagrams(newDiagrams);
    }

    if (props.user.authorization === null) return logout();
    if (props.user.user.username === user.username) return;
    if (props.user) {
      storeUser(props.user.user);
      storeDiagrams(props.user.user.diagrams)
    }
    else logout();

  }, []);

  const [newDiagram, setNewDiagram] = useState(false)
  const [pageLoading, setPageLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState(null);
  const [URI, setURI] = useState('');

  const selectDiagram = (id) => {
    const href = {pathname: 'canvas', query: {diagram: id, name, description}};
    router.push(href, 'diagrams');
  }

  const deleteDiagram = (id) => {
    const fetchURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://giraffeql-api.herokuapp.com'
    fetch(`${fetchURL}/diagrams/${id}`, {method: 'DELETE'})
      .then(res => res.json())
      .then(data => storeDiagrams(data.diagrams));
  }

  const toggleEdit = (id) => {
    console.log(id);
  }

  const checkURLStatus = () => {

    let path = '';

    if (!URI.includes('postgres://')) path = 'postgres://' + URI;
    else path = URI;

    const href = { pathname: '/canvas', query: { data: [path], name, description } }

    router.push(href)
  }

  const newProject = () => {
    const href = { pathname: '/canvas', query: { name, description } }
    router.push(href)
  }

  const sortModes = ['newest', 'oldest', 'most popular', 'favorites'];

  const diagrammodal = newDiagram ? <DiagramModal message={props.message} setPageLoading={setPageLoading} name={name} setName={setName} description={description} setDescription={setDescription} URI={URI} setURI={setURI} checkURLStatus={checkURLStatus} newProject={newProject} /> : '';

  return (
    <div id='diagram'>

      <Head>
        <title>giraffeQL</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      
      <Navbar />

      <div id='browsediagrams'>

        <div id='diagramoptions'>
          <div className='header' style={{borderTopLeftRadius: '8px', borderRight: '2px solid #7c81cf'}} >Options</div>
          <h1>Projects</h1>
          <button onClick={() => setNewDiagram(!newDiagram)} style={{color: '#12b3ab'}} >New Diagram</button>
          <hr />
          <h1>Folders</h1>
          <button >My Projects</button>
          <hr />
          <h1>Quick Start</h1>
          <button >Template Diagrams</button>
          <button >Example Databases</button>
        </div>

        <div id='containerheader'>
          <div className='header' style={{borderTopRightRadius: '8px'}} >My Diagrams</div>

          <div id='sort' >Sort by:
            <input type='text' list='modes' placeholder='newest' />
            <datalist id='modes'>{sortModes.map((sortMode, i) => <option key={`sortModes#${i}`} value={sortMode} /> )}</datalist>
          </div>

          <div id='diagramcontainer'>
            {!diagrams.length ? '' : diagrams.map((diagram, i) => <DiagramPreview name={diagram.diagramName} description={!diagram.description ? '' : diagram.description} updated={diagram.updatedAt} favorite={diagram.favorite} id={diagram._id} key={`diagram#${diagram._id}`} index={i} selectDiagram={selectDiagram} deleteDiagram={deleteDiagram} toggleEdit={toggleEdit} />)}
          </div>

        </div>

      </div>

      {diagrammodal}

      {pageLoading ? <BeatLoader id='beatloader' css={override} color='#12b3ab' pageLoading={pageLoading} size={20} /> : null}

      <style jsx>{`

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;700;900&display=swap');

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
          height: 575px; 
          background-color: white;
          z-index: 10;
          text-align: center;
          vertical-align: center;
        }
        
        #diagramoptions{
          // background-color: red;
          width: 30%;
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
        }

        #diagramcontainer{
          display: flex;
          align-items: center;
          justify-content: center;
          // background-color: #edf2f7;
          width: 98%;
          height: 88%;
          flex-wrap: wrap;
          overflow: auto;
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
