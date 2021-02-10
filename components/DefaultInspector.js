import { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'react-flow-renderer';

const DefaultInspector = (props) => {

    // Create instance of store and allNodes
    const store = useStoreState((store) => store);

    const [expand, showTable] = useState(true);
    const [allNodes, setNodes] = useState([]);

    // Checks if our elements change and if it does, populates allNodes array.
    useEffect(() => {
        // Filter out connections so we only get the nodes themselves.
        setNodes(store.elements.filter(node => !node.id.includes('reactflow')));
    }, [store.elements]);

    // Using ReactFlow action store to be able to select an element/node
    const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);

    const colors=['#ff6b6b', '#f9844aff', '#fee440', '#02c39a', '#4361ee', '#9b5de5', '#f15bb5'];

    return (
        <div className='inspector' style={{transform: `${expand ? '' : 'translateX(-395px)' }`, position: `${expand ? 'fixed' : 'fixed'}`}}>

            <button className='inspectorbtn' onClick={()=>showTable(!expand)} style={{transform: `${expand ? '' : 'translateX(299px)' }`}} >{expand ? '<' : '>'}</button>

            <div id='header' >Tables <button id='createbtn' onClick={props.createNode} >+</button></div>

            {/* Populate panel with all the nodes */}
            {allNodes.map((node, i) => <div className='tablename' key={`defaultnode#${i}`} onClick={()=>(setSelectedElements(node), props.selectNode(node))} style={{borderLeft: `8px solid ${colors[node.id % colors.length]}`}} >{node.data.label.props.children.props.tablename}</div>)}

            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');

                *{
                    font-family: 'Inter', sans-serif;
                }

                .inspector {
                    position: fixed;
                    height: 100%;
                    width: 25%;
                    float: left;
                    background-color: white;
                    z-index: 999999998;
                    box-shadow: 3px 0px 3px rgba(0,0,0,.05);
                }

                .inspectorbtn{
                    font-size: 24px;
                    font-family: 'Inter', sans-serif;
                    position: fixed;
                    padding: 4px 8px;
                    border-bottom-right-radius: 8px;
                    margin-left: 25%;
                    margin-top: 0;
                    color: #6f8195;
                    background-color: #d8e3e8;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    z-index: 9999999999;

                    &:hover{
                        color: #12b3ab;
                        background-color: #cad5e0;
                    }
                }

                #header{
                    position: relative;
                    font-size: 24px;
                    text-align: left;
                    color: white;
                    background-color: #12b3ab;
                    padding: 16px;
                    // border-bottom: 3px solid #b8c2cc;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
                    z-index: 10;
                    height: 30px;
                }

                .tablename{
                    position: relative;
                    font-size: 16px;
                    text-align: left;
                    background-color: #f7fafc;
                    padding: 16px;
                    border-bottom: 1px solid #d9e1e7;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
                    z-index: 9;

                    &:hover{
                        cursor: pointer;
                        background-color: #eaf4ff;
                    }
                }

                #createbtn{

                    background-color: transparent;
                    border: 2px solid white;
                    outline: none;
                    color: white;
                    border-radius: 8px;

                    &:hover{
                        border: 4px solid white;
                        font-weight: 900;
                        margin-left: -2px;
                    }
                }

            `}</style>

        </div>
    );
}

export default DefaultInspector;