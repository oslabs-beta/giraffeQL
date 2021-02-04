import Head from 'next/head'
import ReactFlow, { Handle }  from 'react-flow-renderer';
import React, { useState, useEffect } from 'react'

import Node from '../components/Node.js';

const onNodeDragStop = (event, node) => console.log('');
const onElementClick = (event, element) => console.log('');

const nodeTypes = {
  selectorNode: Node,
};

const graphStyles = { width: "100%", height: "100%px" };

const Canvas = (props) => {

  const [elements, setElements] = useState([]);

  useEffect(() => {

    const newElements = [];
   
    for (let i = 0; i < props.data.tables.length; i++){

      const column = {
          id: `${i}`,
          type: "selectorNode",
          data: {
            label: (
              <div>
                <Node id={`${props.data.tables[i].name}column#${i}`} key={`${props.data.tables[i].name}column#${i}`} IEnumerable={i} tablename={props.data.tables[i].name} columns={props.data.tables[i].columns} />
              </div>
              ),
            },
          position: { x: 50 + (i * 250), y: 50 + (i * 1)}
        }

        newElements.push(column);

    }
    
    setElements([...newElements]);
        
  }, []);

  const BasicGraph = () => <ReactFlow nodeTypes={nodeTypes} elements={elements} style={graphStyles} onElementClick={onElementClick} onNodeDragStop={onNodeDragStop} />;

  return (
    <div id="container">
      <BasicGraph />
      <style jsx>{`
        #container{
          width: 80vw;
          height: 80vh;
          border: 2px solid black;
          background-color: #f1f6f8;
        }
      `}</style>
    </div>
  )
}

export async function getServerSideProps({ query }) {

  const body = {
    URI: query.data
  }

  const res = await fetch(`http://localhost:3000/api/scrapedb`, {method: 'POST', headers: {'Content-Type': 'Application/JSON'}, body: JSON.stringify(body)})
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {data}, 
  }
}

export default Canvas;