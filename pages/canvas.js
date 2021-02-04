import ReactFlow, { Controls, Background, removeElements, addEdge }  from 'react-flow-renderer';
import { useState, useEffect } from 'react'

import Node from '../components/Node.js';

//Set our custom node component from Node.js
const nodeTypes = {
  tableNode: Node,
};

//Various stylings for ReactFlow properties
const graphStyles = { width: '100%', height: '100%' };
const connectionStyles = { stroke: '#0373fc', strokeWidth: '5px'};

const Canvas = (props) => {

  //Our main React Hook state that holds the data of every element (node, connection) that gets rendered onto the page
  //NOTE: When rerendered, all of the existing nodes will have their state reset. This includes expand/collapse state.
    //TODO: Unbundle/refactor state out of Nodes or find way to memoize data on re-render.
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
          //We need to assign every single element a numerical id.
          //These cannot overlap/duplicate, and they cannot contain any other characters.
          id: `${i}`,
          //Our custom Node.js type
          type: "tableNode",
          data: {
            //Our "label" holds all data that we pass into the element.
            //In the case of our nodes, we pass in a Node.js component with all of the props from the associated table data index.
            label: (
              <div>
                <Node id={`${props.data.tables[i].name}column#${i}`} key={`${props.data.tables[i].name}column#${i}`} IEnumerable={i} tablename={props.data.tables[i].name} columns={props.data.tables[i].columns} />
              </div>
              ),
            },
          //The starting position of the node.
          //TODO: replace with smart layout-ing using dagre
          position: { x: 250 * i, y: 50}
        }

        newElements.push(column);

      }
    
    //We replace our existing (or empty by default) elements state with the fetched elements
    //NOTE: we must either always REPLACE the elements array, or ensure we are adding to the array without overlapping id's
    setElements([...newElements]);

  }, []);

  //We set up a component to hold our ReactFlow (the component that holds the methods/functionality of and renders our react-flow)
  //Here's where we can set any properties and add custom methods to be accessible throughout the rest of the app
  const BasicGraph = () =>
    <ReactFlow
      //default zoom properties
      minZoom={0.25}
      maxZoom={1}
      defaultZoom={.4}
      zoomOnScroll={zoomOnScroll}
      zoomOnDoubleClick={zoomOnDoubleClick}

      //Element removal callback
      onElementsRemove={onElementsRemove}

      //Element connect, click, drag callbacks/listeners
      onConnect={onConnect}
      onElementClick={onElementClick}
      onNodeDragStop={onNodeDragStop}
      
      //Assigning our custom types to be rendered
      nodeTypes={nodeTypes}
      elements={elements}
      style={graphStyles}

      connectionLineType={'step'}
      connectionLineStyle={connectionStyles}
      >
      {/* Bottom-left UI zoom and fit screen controls */}
      <Controls />
      {/* Background pattern, can be lines or dots */}
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
  
  //Check if we just fetched from a bad URI... don't want to crash the whole app!
  if (res.status === 400) {
    return {
      redirect: {
        //We redirect the user back to the root page.
        destination: '/',
        permanent: false,
      },
    }
  }
  
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    //The data we fetch from the database gets passed into our component as props
    //We have two arrays inside of data:
      //1. tables
      //2. connections
    props: {data}, 
  }
}

export default Canvas;