//🦒
import Head from 'next/head';
import ReactFlow, { removeElements, ReactFlowProvider, getConnectedEdges, isNode}  from 'react-flow-renderer';

import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/state.js';

import getUser from '../controller/getUser.js';

import Node from '../components/canvas/Node.js';
import NodeInspector from '../components/canvas/NodeInspector.js';
import DefaultInspector from '../components/canvas/DefaultInspector.js';
import SchemaIDE from '../components/canvas/SchemaIDE.js';
import Navbar from '../components/canvas/Navbar.js';
import DeleteModal from '../components/canvas/DeleteModal.js';

import dagre from 'dagre';
import { parseCookies } from 'nookies';
import html2canvas from 'html2canvas';

// Set our custom node component from Node.js
const nodeTypes = {
  tableNode: Node,
};

// Various stylings for ReactFlow properties
const graphStyles = { width: '100%', height: '100%' };
const connectionStyles = { stroke: '#0373fc', strokeWidth: '5px' };

// Dagre layout graph
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const Canvas = (props) => {

  const { user, storeUser, logout, diagrams } = useContext(UserContext);

  useEffect(() => {
    if (props.user.authorization === null) return logout();
    if (props.user.user.username === user.username) return;
    if (props.user) storeUser(props.user.user);
    else logout();
  }, []);

  const [diagramId, setDiagramID] = useState(undefined);
  const [diagramName, setDiagramName] = useState('Untitled-database-diagram');
  const [description, setDescription] = useState(null);

  // Our main React Hook state that holds the data of every element (node, connection) that gets rendered onto the page
  const [elements, setElements] = useState([]);
  const [index, setNodeCount] = useState(0);
  const [formattedTables, repackageData] = useState([]);

  const [layedout, toggleLayout] = useState(false);
  const [updated, updateData] = useState(false);
  const [startEdit, toggleStartEdit] = useState(false);

  const [instance, cacheInstance] = useState(null);

  // Zoom prevention
  const [zoomOnScroll, setZoomOnScroll] = useState(true);
  const [zoomOnDoubleClick, setZoomOnDoubleClick] = useState(false);

  const [deleteNode, selectDelete] = useState(null);
  const [deleteWarning, toggleWarning] = useState(true);

  // Function that gets called when an element is removed. Sets activeNode to null and decrements element array length and removes element from state
  const confirmRemoveElement = (elementsToRemove) => setElements((els) => (selectNode(null), setNodeCount(index - 1), removeElements(elementsToRemove, els)), selectDelete(null));

  const onElementsRemove = (elementsToRemove) => {
    if (deleteWarning)
      selectDelete(elementsToRemove);
    else
      confirmRemoveElement(elementsToRemove);
  }
  
  const [activeNode, selectNode] = useState(null);
  
  // Where node/element is created
  const createElement = () => {

    const defaultColumn = {
      name: 'newColumn#1',
      dataType: 'character varying',
      required: true,
      primaryKey: true
    };

    const column = {
      id: index.toString(),
      type: 'tableNode',
      data: {
        label: (
          <div>
            <div id={`NewTable-${index}`} key={`NewTable-${index}`} nodeid={index} tablename={`new_table_#${index}`} columns={[defaultColumn]} selectedEdges={selectedEdges} startExpanded={true} />
          </div>
          ),
        },
      position: { x: 0, y: 0},
      sourcePosition: 'right',
      targetPosition: 'left'
    }

    const newElements = [...elements];
    newElements.splice(index, 0, column);

    setElements(newElements);
    toggleStartEdit(true);
    selectNode(column);
    
    setNodeCount(index + 1);

  };
  
  // Built in method of ReactFlow that gives reference to instance of ReactFlow, which is saved to state. 
  const onLoad = (reactFlowInstance) => {
    cacheInstance(reactFlowInstance);
  };  

  // Once we have capture of instance, we are fitting nodes to instance viewport and ability to zoom. 
  useEffect(() => {

    if (!instance)
      return;
    
    instance.fitView();
    instance.zoomTo(.4);
    
  }, [instance]);

  useEffect(() => {

    if (!updated)
      return;

    const body = {
      user: user._id,
      diagramId,
      diagramName: diagramName === '' ? 'Untitled-database-diagram' : diagramName,
      description,
      tables: formattedTables
    };

    const fetchURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://giraffeql.io';
    fetch(`${fetchURL}/diagrams`, { method: 'PUT', headers: { 'Content-Type': 'Application/JSON' }, body: JSON.stringify(body)})
      .then(res => res.json())
      .then(data => (setDiagramID(data.diagram._id), updateData(false)));

  }, [updated]);

  //Component to get the layouted elements
  //By default, set to 'LR', AKA Left -> Right
  //Can also be set to TB, AKA Top -> Bottom
  const getLayoutedElements = (elements, direction = 'LR') => {

    if (elements.length < 1)
      return;

    const isHorizontal = direction === 'LR';

    dagreGraph.setGraph({ rankdir: direction });

    elements.forEach((el) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, { width: 300, height: 150 });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);
    
    return elements.map((el) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);
        el.targetPosition = isHorizontal ? 'left' : 'top';
        el.sourcePosition = isHorizontal ? 'right' : 'bottom';
        el.position = {
          x: nodeWithPosition.x,
          y: nodeWithPosition.y,
        };
      }
      toggleLayout(true);
      return el;
    });
  };

  // We pass in our elements to the layout
  if (!layedout){
    const layoutedElements = getLayoutedElements(elements);
  }

  // Listeners for user interaction with nodes - gets called everytime we connect two nodes to each other. 
  const onConnect = (params) => {

    const connection = {
      id: `reactflow${params.source}${params.sourceHandle}-${params.target}${params.targetHandle}`,
      source: params.source,
      sourceHandle: params.sourceHandle,
      target: params.target,
      targetHandle: params.targetHandle,
      animated: true,
      style: { stroke: 'rgba(3, 115, 252, .75)', strokeWidth: '1px' },
    }

    const newElements = [...elements];
    newElements.push(connection)
    
    setElements(els => els.concat([connection]));
  };

  // If anywhere on canvas is clicked besides a node, activeNode is set to null
  const onPaneClick = () => selectNode(null);

  const onElementClick = (event, element) => {if (isNode(element) && element !== activeNode) return selectNode(element)};
  const onNodeDragStart = (event, node) => {if (node !== activeNode) return selectNode(node)};
  
  // Callback that is drilled into all nodes, that returns all of the edges connected to selectedNode.
  const selectedEdges = (node, edges) => {if (node) return getConnectedEdges(node, edges)};
  
  // Anytime we update values in editable mode, this is used to update the elements array in state. 
  const nodeValueChange = (node) => {
    
    if(!node.data.label.props.children.props.selectedEdges)
      node.data.label.props.children.props.selectedEdges = selectedEdges;

    const newElements = [...elements];
    const target = newElements.findIndex(element => element.id === node.id);

    newElements.splice(target, 1, node);
    setElements(newElements);
  };

  //Runs only once when this page renders
  useEffect(() => {

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const imports = [];

    if (props.hasOwnProperty('name'))
      setDiagramName(props.name);

    if (props.hasOwnProperty('description'))
      setDescription(props.description);

    if (props.hasOwnProperty('diagramId')){

      const diagram = diagrams[diagrams.findIndex(diagram => diagram._id === props.diagramId)];

      toggleLayout(true);

      setDiagramID(props.diagramId)
      setDiagramName(diagram.diagramName);
      if (diagram.hasOwnProperty('description'))
        setDescription(diagram.description);

      diagram.tables.forEach(table => {
        imports.push(table);
      });

    } else if (props.hasOwnProperty('data')){

      props.data.tables.forEach(table => {
        imports.push(table);
      });

    } else return;

    const newElements = [];
   
    for (let i = 0; i < imports.length; i++){

      //For each "column" from our data of tables, we assign the same object information that's expected from a Node element to render properly
      const column = {
        //We need to assign every single element a numerical id.
        //These cannot overlap/duplicate, and they cannot contain any other characters.
        id: `${i}`,
        //Our custom Node.js type
        type: 'tableNode',
        data: {
          //Our "label" holds all data that we pass into the element.
          //In the case of our nodes, we pass in a Node.js component with all of the props from the associated table data index.
          label: (
            <div>
              <div id={`${imports[i].name}column#${i}`} key={`${imports[i].name}column#${i}`} nodeid={i} tablename={imports[i].name} columns={imports[i].columns} selectedEdges={selectedEdges} />
            </div>
            ),
          },
        //The starting position of the node.
        //TODO: replace with smart layout-ing using dagre
        position: imports[i].hasOwnProperty('position') ? imports[i].position : { x: 0, y: 0}
      }

      newElements.push(column);

    }

    // We also iterate AGAIN through the tables data to add each connection
    // We do this after our first loop because the connections must happen AFTER the nodes themselves have been established

    for (let i = 0; i < imports.length; i++){

      // Going inside the connections array
      for (let j = 0; j < imports[i].connections.length; j++){

        const columnNumber = imports[i].columns.findIndex(column => column.name === imports[i].connections[j].originKey);

        const target = imports.findIndex(table => table.name === imports[i].connections[j].destinationTable);
        const targetHandle = imports[target].columns.findIndex(column => column.name === imports[i].connections[j].destinationKey);

        // All id's and source/target's etc. need to be converted to STRINGS, not INTs
        const connection = {
          id: `reactflow${i}${alphabet[columnNumber]}-${target}${alphabet[targetHandle]}`,
          source: i.toString(),
          sourceHandle: alphabet[columnNumber],
          target: target.toString(),
          targetHandle: alphabet[targetHandle],
          animated: true,
          style: { stroke: 'rgba(3, 115, 252, .75)', strokeWidth: '1px' },
        }

        newElements.push(connection);

      }

    }

    //We replace our existing (or empty by default) elements state with the fetched elements
    //NOTE: we must either always REPLACE the elements array, or ensure we are adding to the array without overlapping id's
    setElements([...newElements]);
    setNodeCount(imports.length);

  }, []);

  useEffect(() => {

    if (!elements.length)
      return;
    
    formatData(elements);

  }, [elements]);

  useEffect(() => {

    if (!formattedTables.length)
      return;

    updateData(true);
  }, [formattedTables]);
  
  // Toggle between defaultInspector and nodeInspector when a node is selected.
  const inspector =  !activeNode ? <DefaultInspector selectNode={selectNode} createNode={createElement} /> : <NodeInspector data={activeNode} nodeValueChange={nodeValueChange} startEdit={startEdit} toggleStartEdit={toggleStartEdit} />;
  const deleteModal = !deleteNode ? <div/> : <DeleteModal deleteNode={deleteNode} selectDelete={selectDelete} confirmRemoveElement={confirmRemoveElement} toggleWarning={toggleWarning} />;

  const formatData = (elements) => {

    const newTables = [];

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    // ONLY iterating through the node's by filtering out the connections.
    elements.filter(node => !node.id.includes('reactflow')).forEach((node, i) => {

        const newTable = {};

        newTable.name = node.data.label.props.children.props.tablename;
        newTable.columns = node.data.label.props.children.props.columns;
        newTable.connections = [];
        newTable.position = node.position;

        // Iterate through the nodes connections
        elements.filter(connection => connection.id.includes('reactflow') && connection.source === i.toString()).forEach(connection => {

            const newConnection = {};

            const targetNode = elements.findIndex(target => target.id === connection.target.toString());

            //TODO: Fix error'ing out when deleteing a table.
            newConnection.originKey = node.data.label.props.children.props.columns[alphabet.indexOf(connection.sourceHandle)].name;
            newConnection.destinationTable = elements[targetNode].data.label.props.children.props.tablename;
            newConnection.destinationKey = elements[targetNode].data.label.props.children.props.columns[alphabet.indexOf(connection.targetHandle)].name;

            newTable.connections.push(newConnection);

        });

        newTables.push(newTable);

    });

    repackageData(newTables);

    if (diagramId === undefined) return;

    html2canvas(document.getElementById('rf')).then(function(canvas) {
      saveImage(canvas.toDataURL(), `${diagramId}.png`);
    });

  }

  const saveImage = (uri, filename) => {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        // link.click();

        //remove the link when done
        document.body.removeChild(link);

    } else {

        window.open(uri);

    }
}

  return (
    <div id='root'>

      <Head>
        <title>giraffeQL - Canvas</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <div id='canvascontainer'>
            
        {/*We set up a component to hold our ReactFlow (the component that holds the methods/functionality of and renders our react-flow)*/}
        {/*Here's where we can set any properties and add custom methods to be accessible throughout the rest of the app*/}
        <ReactFlowProvider>
          <Navbar search={selectNode} name={diagramName} />
          {inspector}
          <ReactFlow id='rf'
              //default zoom properties
              minZoom={0.1}
              maxZoom={.75}
              defaultZoom={.4}
              zoomOnScroll={zoomOnScroll}
              zoomOnDoubleClick={zoomOnDoubleClick}

              //Element removal callback
              onElementsRemove={onElementsRemove}

              //Element connect, click, drag callbacks/listeners
              onConnect={onConnect}
              onElementClick={onElementClick}
              onNodeDragStart={onNodeDragStart}

              onLoad={onLoad}
              onPaneClick={onPaneClick}
              
              //Assigning our custom types to be rendered
              nodeTypes={nodeTypes}
              elements={elements}
              style={graphStyles}

              // connectionLineType={'step'}
              connectionLineStyle={connectionStyles}
              >
              {/* Bottom-left UI zoom and fit screen controls */}
              {/*<Controls style={{zIndex: '999999999', marginBottom: '8px', marginLeft: '96.5vw', position: 'fixed'}} />*/}
              {/* Background pattern, can be lines or dots */}
              
          </ReactFlow>
          {deleteModal}
          <SchemaIDE updated={updated} resetUpdate={updateData} />
        </ReactFlowProvider>
        
      </div>
      
      <style jsx>{`

        #root{
          overflow: hidden;
          width: 100vw;
          height: 100vh;
          background-color: #edf2f7;
        }

        #canvascontainer{
          display: flex;
          width: 100%;
          height: 100%;
          margin-top: 55px;
        }

      `}</style>
    </div>
  )
}

//Runs on page load
export async function getServerSideProps(ctx) {

  const props = {};
  const query = ctx.query;

  const { authorization } = parseCookies(ctx);
  const { token } = ctx.query
  props.user = await getUser(authorization || token);

  if (!query.hasOwnProperty('diagram') && !query.hasOwnProperty('data')){

    if (query.hasOwnProperty('name')) props.name = query.name;
    if (query.hasOwnProperty('description')) props.description = query.description;

    return {props};
  }

  if (query.hasOwnProperty('diagram')){

    props.diagramId = query.diagram;

    return {props};
  }

  //We grab the URI directly from the page's URL (in the context's query)
  const body = {
    URI: query.data
  }

  const fetchURL = process.env.NODE_ENV === 'development' ? `http://localhost:3000` : `https://giraffeql.io`;

  const res = await fetch(`${fetchURL}/api/scrapedb`, {method: 'POST', headers: {'Content-Type': 'Application/JSON'}, body: JSON.stringify(body)})
  
  //Check if we just fetched from a bad URI... don't want to crash the whole app!
  if (res.status === 400) {
    return {
      redirect: {
        //We redirect the user back to the root page.
        destination: '/diagrams/?message=error',
        permanent: false,
        message: 'Sending some sort of message back'
      },
    }
  }
  
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    }
  }

  props.data = data;

  if (query.hasOwnProperty('name')) props.name = query.name;
  if (query.hasOwnProperty('description')) props.description = query.description;

  return {props};
}

export default Canvas;