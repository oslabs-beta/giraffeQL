import Head from 'next/head'
import ReactFlow, { Handle }  from 'react-flow-renderer';
import { useEffect } from 'react'

import Node from '../components/Node.js';

const onNodeDragStop = (event, node) => console.log('drag stop', node);
const onElementClick = (event, element) => console.log('click', element);

const nodeTypes = {
  selectorNode: Node,
};

const data = {
	tables: [
		{ 
			name: 'people',
			columns: [
				{
					name: '_id',
					dataType: 'Int',
					required: true 
				},
				{
					name: 'name',
					dataType: 'string',
					required: true 
				},
				{
					name: 'age',
					dataType: 'Int',
					required: true
				},
				{
					name: 'homeworld_id',
					dataType: 'int',
					required: false
				}
			] 
		}
  ],
	connections: [ 
		{ 
			origin: 'people',
			originKey:  'species_id',
			destination: 'species',
			destinationKey: '_id',
		}
	]
}

const elements = [
  {
    id: "1",
    type: "selectorNode",
    data: {
      label: (
        <div>
          <Node tablename={data.tables[0].name} columns={data.tables[0].columns} />
        </div>
        ),
      },
    position: { x: 50, y: 50 }
  },
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
  { id: "3", data: { label: "Node 3" }, position: { x: 250, y: 150 } },
  { id: "e1a-2", source: "1", target: "2", sourceHandle: "a", type: "smoothstep", animated: true },
  { id: "e1b-3", source: "1", target: "3", sourceHandle: "b", type: "smoothstep", animated: true },
];

const graphStyles = { width: "100%", height: "100%px" };

const BasicGraph = () => <ReactFlow nodeTypes={nodeTypes} elements={elements} style={graphStyles} onElementClick={onElementClick} onNodeDragStop={onNodeDragStop} />;

export default function Home() {

  const body = {
    URI: "postgres://lfawycfl:yc837PGh-S4jP4YIHJlv6Ldh7C7P2xJw@suleiman.db.elephantsql.com:5432/lfawycfl"
  }

  useEffect(() => {
    fetch(`/api/scrapedb`, {method: 'POST', headers: {'Content-Type': 'Application/JSON'}, body: JSON.stringify(body)})
      .then(res=>res.json())
      .then(data=>console.log(data))
      .catch(err => console.log(`Error sending survey to db: ${err}`));
  });

  return (
    <div id="container">
      <BasicGraph />
      <style jsx>{`
        #container{
          width: 80vw;
          height: 80vh;
          border: 2px solid black;
        }
      `}</style>
    </div>
  )
}
