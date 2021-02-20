import { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'react-flow-renderer';

const DiagramSideBar = (props) => {

  const [expand, showDiagrams] = useState(true);

    return (
        <div className='sidebar' >

            <div id='header' >All Diagrams</div>
            {/* Populate panel with all the nodes */}
            {/* {allNodes.map((node, i) => <div className='tablename' key={`defaultnode#${i}`} onClick={()=>(setSelectedElements(node), props.selectNode(node))} style={{borderLeft: `8px solid ${colors[node.id % colors.length]}`}} >{node.data.label.props.children.props.tablename}</div>)} */}

            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');

                *{
                    font-family: 'Inter', sans-serif;
                }

                .sidebar {
                    position: fixed;
                    height: 575px; 
                    width: 15%;
                    float: left;
                    background-color: white;
                    z-index: 999999998;
                    box-shadow: 3px 0px 3px rgba(0,0,0,.05);
                }

                .sidebarbtn{
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

                .diagramname{
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

export default DiagramSideBar;