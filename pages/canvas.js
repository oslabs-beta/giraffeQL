//🦒
import ReactFlow, { removeElements, ReactFlowProvider, getConnectedEdges, isNode}  from 'react-flow-renderer';
import { useState, useEffect } from 'react'

import dagre from 'dagre';

import Node from '../components/Node.js';
import NodeInspector from '../components/NodeInspector.js';
import DefaultInspector from '../components/DefaultInspector.js';
import SchemaIDE from '../components/SchemaIDE.js';
import Navbar from '../components/Navbar.js';

//Set our custom node component from Node.js
const nodeTypes = {
  tableNode: Node,
};

//Various stylings for ReactFlow properties
const graphStyles = { width: '100%', height: '100%' };
const connectionStyles = { stroke: '#0373fc', strokeWidth: '5px' };

//Dagre layout graph
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const Canvas = (props) => {

  //Our main React Hook state that holds the data of every element (node, connection) that gets rendered onto the page
  //NOTE: When rerendered, all of the existing nodes will have their state reset. This includes expand/collapse state.
  //TODO: Unbundle/refactor state out of Nodes or find way to memoize data on re-render.
  const [elements, setElements] = useState([]);
  const [index, setNodeCount] = useState(0);

  const [layedout, toggleLayout] = useState(false);
  const [updated, updateData] = useState(false);
  const [startEdit, toggleStartEdit] = useState(false);

  const [instance, cacheInstance] = useState(null);

  //Zome prevention
  const [zoomOnScroll, setZoomOnScroll] = useState(true);
  const [zoomOnDoubleClick, setZoomOnDoubleClick] = useState(false);

  const onElementsRemove = (elementsToRemove) => setElements((els) => (selectNode(null), setNodeCount(index - 1), removeElements(elementsToRemove, els)), updateData(true));
  const [activeNode, selectNode] = useState(null);

  const createElement = () => {

    const defaultColumn = {
      name: 'newColumn',
      dataType: 'character varying',
      required: true
    };

    const column = {
      id: index.toString(),
      type: 'tableNode',
      data: {
        label: (
          <div>
            <div id={`NewTable-${index}`} key={`NewTable-${index}`} nodeid={index} tablename={`New Table #${index}`} columns={[defaultColumn]} selectedEdges={selectedEdges} startExpanded={true} />
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
    updateData(true);

  };

  const onLoad = (reactFlowInstance) => {
    cacheInstance(reactFlowInstance);
  };  

  useEffect(() => {

    if (!instance)
      return;
    
    instance.fitView();
    instance.zoomTo(.4);
    
  }, [instance]);

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

  //We pass in our elements to the layout
  if (!layedout){
    const layoutedElements = getLayoutedElements(elements);
  }

  //Listeners for user interaction with nodes
  const onConnect = (params) => {

    const connection = {
      id: `reactflow${params.source}${params.sourceHandle}-${params.target}${params.targetHandle}`,
      source: params.source,
      sourceHandle: params.sourceHandle,
      target: params.target,
      targetHandle: params.targetHandle,
      animated: true,
      // type: 'step',
      style: { stroke: 'rgba(3, 115, 252, .75)', strokeWidth: '1px' },
    }

    const newElements = [...elements];
    newElements.push(connection)
    
    setElements(els => els.concat([connection]));
  };

  const onPaneClick = () => selectNode(null);

  const onElementClick = (event, element) => {if (isNode(element) && element !== activeNode) return selectNode(element)};
  const onNodeDragStart = (event, node) => {if (node !== activeNode) return selectNode(node)};
  const selectedEdges = (node, edges) => {if (node) return getConnectedEdges(node, edges)};
  const nodeValueChange = (node) => {

    if(!node.data.label.props.children.props.selectedEdges)
      node.data.label.props.children.props.selectedEdges = selectedEdges;

    const newElements = [...elements];
    const target = newElements.findIndex(element => element.id === node.id);

    newElements.splice(target, 1, node);
    setElements(newElements);

    updateData(true);
    
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
        type: 'tableNode',
        data: {
          //Our "label" holds all data that we pass into the element.
          //In the case of our nodes, we pass in a Node.js component with all of the props from the associated table data index.
          label: (
            <div>
              <div id={`${props.data.tables[i].name}column#${i}`} key={`${props.data.tables[i].name}column#${i}`} nodeid={i} tablename={props.data.tables[i].name} columns={props.data.tables[i].columns} selectedEdges={selectedEdges} />
            </div>
            ),
          },
        //The starting position of the node.
        //TODO: replace with smart layout-ing using dagre
        position: { x: 0, y: 0}
      }

      newElements.push(column);

    }

    //We also iterate AGAIN through the tables data to add each connection
    //We do this after our first loop because the connections must happen AFTER the nodes themselves have been established

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    for (let i = 0; i < props.data.tables.length; i++){

      //Going inside the connections array
      for (let j = 0; j < props.data.tables[i].connections.length; j++){

        const columnNumber = props.data.tables[i].columns.findIndex(column => column.name === props.data.tables[i].connections[j].originKey);

        const target = props.data.tables.findIndex(table => table.name === props.data.tables[i].connections[j].destinationTable);
        const targetHandle = props.data.tables[target].columns.findIndex(column => column.name === props.data.tables[i].connections[j].destinationKey);

        const connection = {
          id: `reactflow${i}${alphabet[columnNumber]}-${target}${alphabet[targetHandle]}`,
          source: i.toString(),
          sourceHandle: alphabet[columnNumber],
          target: target.toString(),
          targetHandle: alphabet[targetHandle],
          animated: true,
          // type: 'step',
          style: { stroke: 'rgba(3, 115, 252, .75)', strokeWidth: '1px' },
        }

        newElements.push(connection);

      }

    }

    //We replace our existing (or empty by default) elements state with the fetched elements
    //NOTE: we must either always REPLACE the elements array, or ensure we are adding to the array without overlapping id's
    setElements([...newElements]);
    setNodeCount(props.data.tables.length);

    updateData(true);

  }, []);

  const inspector =  activeNode ? <NodeInspector data={activeNode} nodeValueChange={nodeValueChange} startEdit={startEdit} toggleStartEdit={toggleStartEdit} /> : <DefaultInspector selectNode={selectNode} createNode={createElement} />;

  return (
    <div id='root'>

      <div id='canvascontainer'>
            
        {/*We set up a component to hold our ReactFlow (the component that holds the methods/functionality of and renders our react-flow)*/}
        {/*Here's where we can set any properties and add custom methods to be accessible throughout the rest of the app*/}
        <ReactFlowProvider>
          <Navbar search={selectNode} />
          {inspector}
          <ReactFlow
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
export async function getServerSideProps({ query }) {

  //We grab the URI directly from the page's URL (in the context's query)
  const body = {
    URI: query.data
  }

  const res = await fetch(`http://localhost:3000/api/scrapedb`, {method: 'POST', headers: {'Content-Type': 'Application/JSON'}, body: JSON.stringify(body)})
  
  //Check if we just fetched from a bad URI... don't want to crash the whole app!
  if (res.status === 400) {
    return [{
      redirect: {
        //We redirect the user back to the root page.
        destination: '/',
        permanent: false,
        message: 'Sending some sort of message back'
      },
    }]
  }
  
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    //The data we fetch from the database gets passed into our component as props
    props: {data}, 
  }
}

export default Canvas;