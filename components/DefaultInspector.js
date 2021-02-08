import { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'react-flow-renderer';

const DefaultInspector = (props) => {

    const store = useStoreState((store) => store);

    const [expand, showTable] = useState(true);
    const [allNodes, setNodes] = useState([]);

    useEffect(() => {
        setNodes(store.elements.filter(node => !node.id.includes('reactflow')));
    }, [store.elements]);

    const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);

    const colors=['#ff6b6b', '#f9844aff', '#fee440', '#02c39a', '#4361ee', '#9b5de5', '#f15bb5'];

    return (
        <div className='inspector' style={{transform: `${expand ? '' : 'translateX(-395px)' }`, position: `${expand ? 'fixed' : 'fixed'}`}}>

            <button className='inspectorbtn' onClick={()=>showTable(!expand)} style={{transform: `${expand ? '' : 'translateX(313px)' }`}} >{expand ? '<' : '>'}</button>

            {allNodes.map((node, i) => <div className='tablename' key={`defaultnode#${i}`} onClick={()=>(setSelectedElements(node), props.selectNode(node))} style={{borderLeft: `8px solid ${colors[node.id % colors.length]}`}} >{node.data.label.props.children.props.tablename}</div>)}

            <style jsx>{`

                *{
                    font-family: 'Inter', sans-serif;
                }

                .inspector {
                    position: fixed;
                    height: 100%;
                    width: 23%;
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
                    margin-left: 23%;
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

                .tablename{
                    font-size: 16px;
                    text-align: left;
                    background-color: #f7fafc;
                    padding: 16px;
                    border-bottom: 1px solid #d9e1e7;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);

                    &:hover{
                        cursor: pointer;
                        background-color: #eaf4ff;
                    }
                }

            `}</style>

        </div>
    );
}

export default DefaultInspector;