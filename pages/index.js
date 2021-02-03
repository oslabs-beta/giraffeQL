import Head from 'next/head'
import ReactFlow, { Handle }  from 'react-flow-renderer';

const elements = [
  {
    id: "1",
    type: "input",
    data: { label: "Master Node" },
    position: { x: 50, y: 50 }
  },
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
  { id: "3", data: { label: "Node 3" }, position: { x: 250, y: 150 } },
  { id: "4", data: { label: "Node 4" }, position: { x: 500, y: 200 } },
  { id: "5", data: { label: "Node 5" }, position: { x: 750, y: 250 } },
  {
    id: "6",
    data: { label: "Node 6" },
    position: { x: 800, y: 300 },
    type: "output"
  },
  { id: "e1-2", source: "3", target: "2", type: "straight" },
  { id: "e1-3", source: "1", target: "3", type: "default" },
  { id: "e1-4", source: "1", target: "4", type: "default" },
  { id: "e1-5", source: "5", target: "2", type: "step", animated: true },
  { id: "e1-6", source: "1", target: "6", type: "step" }
];

const graphStyles = { width: "100%", height: "500px" };

const BasicGraph = () => <ReactFlow elements={elements} style={graphStyles} />;

export default function Home() {
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
