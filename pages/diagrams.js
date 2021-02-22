import Head from 'next/head';

import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/state.js';

import DiagramSideBar from '../components/diagrams/DiagramSideBar.js';
import DiagramNavbar from '../components/diagrams/DiagramNavbar.js';
import DiagramModal from '../components/diagrams/DiagramModal.js';
import DiagramsHeader from '../components/icons/DiagramsHeader.js';

const Diagrams = (props) => {

  const [newDiagram, setNewDiagram] = useState(false)
  const [pageLoading, setPageLoading] = useState(false);

  const sidebar = <DiagramSideBar />

  const diagrammodal = newDiagram ? <DiagramModal message={props.message} setPageLoading={setPageLoading} /> : '';

  return (
      <div id='diagram'>

        <Head>
          <title>giraffeQL</title>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>

        <DiagramsHeader />
        
        <DiagramNavbar />

        <div id='browsediagrams'>
          {sidebar}
          <button id='newdiagrambtn' onClick={() => setNewDiagram(!newDiagram)}>+</button>
        </div>

        {diagrammodal}

        { pageLoading ? (<div id='loading'>Searching for your database...</div>) : <div/>}

        <style jsx>{`

          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;700;900&display=swap');

          *{
            font-family: 'Inter', sans-serif;
            transition: all .3s ease;
            font-weight: 300;
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
            flex-direction: column;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06), 0px 0px 16px 0px rgba(0,0,0,.1);
            border-radius: 8px;
            width: 55%;
            height: 575px; 
            background-color: white;
            z-index: 10;
            text-align: center;
            vertical-align: center;
          }

            #databaselist{
              padding: 0;
              margin: 0;
              border: none;
              outline: none;
              background-color: transparent;
              color: #6f8195;
            }

            button{
                background-color: transparent;
                border: 2px solid white;
                outline: none;
                color: white;
                border-radius: 8px;
                z-index: 999999999999999;
                width: 2em;
                height: 2em;
                margin-top: 1.1%;
                margin-left: 12%;
                padding: 0;
                font-size: .6em;
                

                &:hover{
                  border: 3px solid white;
                  background-color: darken(#12b3ab, 5%);
                  width: 2.1em;
                  height: 2.1em;
                }
            }

        `}</style>
          
      </div>
  );
}

export default Diagrams;

export async function getServerSideProps({ query }) {

  const props = {};
  
  if (query.error)
    props.error = query.error;

  if (query.message)
    props.message = query.message;

  return {props};
}
