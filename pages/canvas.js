import Head from 'next/head'
import ReactFlow, { Controls, Background, removeElements, addEdge }  from 'react-flow-renderer';
import React, { useState, useEffect } from 'react'

import Node from '../components/Node.js';

//Set our custom node component from Node.js
const nodeTypes = {
  tableNode: Node,
};

//Various stylings for ReactFlow properties
const graphStyles = { width: '100%', height: '100%' };
const connectionStyles = { stroke: '#0373fc', strokeWidth: '5px'}

const Canvas = (props) => {

  //Our main React Hook state that holds the data of every element (node, connection) that gets rendered onto the page
  const [elements, setElements] = useState([]);

  //Zome prevention
  const [zoomOnScroll, setZoomOnScroll] = useState(false);
  const [zoomOnDoubleClick, setZoomOnDoubleClick] = useState(false);

  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const [activeNode, selectNode] = useState(null);

  //Listeners for user interaction with nodes
  const onNodeDragStop = (event, node) => console.log('');
  const onElementClick = (event, element) => {
    if (activeNode == element)
      return;
    console.log('');
  };

  //Runs only once when this page renders
  useEffect(() => {

    const newElements = [];
   
    for (let i = 0; i < props.data.tables.length; i++){

      //For each "column" from our data of tables, we assign the same object information that's expected from a Node element to render properly
      const column = {
          id: `${i}`,
          //Our custom Node.js type
          type: "tableNode",
          data: {
            label: (
              <div>
                <Node id={`${props.data.tables[i].name}column#${i}`} key={`${props.data.tables[i].name}column#${i}`} IEnumerable={i} tablename={props.data.tables[i].name} columns={props.data.tables[i].columns} />
              </div>
              ),
            },
          //The starting position of the node.
          //TODO: replace with smart layout-ing using dagre
          position: { x: 50 + (i * 250), y: 50 + (i * 1)}
        }

        newElements.push(column);

      }
    
    setElements([...newElements]);

  }, []);

  const BasicGraph = () =>
    <ReactFlow
      minZoom={0.25}
      maxZoom={1}
      defaultZoom={.4}
      zoomOnScroll={zoomOnScroll}
      zoomOnDoubleClick={zoomOnDoubleClick}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      elements={elements}
      style={graphStyles}
      onElementClick={onElementClick}
      onNodeDragStop={onNodeDragStop}
      connectionLineType={'step'}
      connectionLineStyle={connectionStyles}
      >
      <Controls />
      <Background
        variant="lines"
        gap={64}
        size={1}
      />
    </ReactFlow>;

  return (
    <div id="container">
      <BasicGraph />
      <style jsx>{`
        #container{
          overflow: hidden;
          width: 100vw;
          height: 100vh;
          background-color: #f1f6f8;
        }
      `}</style>
    </div>
  )
}

//Runs on page load
export async function getServerSideProps({ query }) {

  //We grab the URI directly from the page's URL (in the context's query)
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