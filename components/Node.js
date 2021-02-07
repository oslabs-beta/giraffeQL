import React, { useState, useEffect, memo } from 'react';
import { useStoreState } from 'react-flow-renderer';

import Column from './Column.js';

//By default custom Nodes use React.memo() so that their data becomes memoized.
export default memo(({ data }) => {

    //We access our "props" by going into the passed in data and extracting it from several nested objects
    //This is only necessaray because of how data gets passed by the element label
    const props = data.label.props.children.props;
    const store = useStoreState((store) => store);

    //State for whether this is the activeNode or not
    const [selected, selectNode] = useState(false);
    //State for expand/collapse functionality
    const [expand, showTable] = useState(false);
    //An array storing all in-going and out-going edges
    const [edges, populateEdges] = useState([]);

    //useEffect #1 on [store.edges]:
    //Populate the edges array on first render, and every time our edges change
    useEffect(() => {
        populateEdges(props.selectedEdges([store.elements[props.nodeid]], store.edges));
    }, [store.edges]);

    //useEffect #2 on [selectedElements]:
    //Checks the selectedElement's id against this node's id
    //If they match, this becomes the selected node.
    useEffect(() => {

        if (!store.selectedElements && selected)
            deselect();
            
        if (!store.selectedElements)
            return;

        if (store.selectedElements[0].id != props.nodeid.toString() && !selected)
            return;

        if (store.selectedElements[0].id === props.nodeid.toString() && !selected){

            selectNode(true);
            showTable(true);

        }
        else if (store.selectedElements[0].id !== props.nodeid.toString() && selected)
            deselect();

    }, [store.selectedElements]);

    //useEffect #3 on [edges]:
    //Checks for changes in the edges state array length
    //When the array becomes greater than 0, we highlight the edges and color in-going and out-going
    useEffect(() => {

        if (!selected)
            return;

        edges.forEach(edge => edge.source === props.nodeid.toString() ? edge.style = { stroke: 'rgba(3, 115, 252, 1)', strokeWidth: '5px' } : edge.style = { stroke: 'rgba(255, 107, 107, 1)', strokeWidth: '5px' });

    }, [selected])

    const deselect = () => {
        selectNode(false);

        edges.forEach(edge => {
            edge.style = { stroke: 'rgba(3, 115, 252, .75)', strokeWidth: '1px' };
        });
    }

    //Array of possible header colors
    //TOOD: Expand, make editable
    const colors=['#ff6b6b', '#f9844aff', '#fee440', '#02c39a', '#4361ee', '#9b5de5', '#f15bb5'];

    return (
        <div className='node' style={{minWidth: `${expand ? '500px' : '0px'}`, transition: `${!  expand ? 'all .5s ease' : 'all 0.2s'}`}}>

            <h1>{props.active}</h1>

            {/* The Table Name div acts as a button to expand/collapse the table's column content on Double Click */}
            <div onDoubleClick={() => showTable(!expand)} className='tablename' style={{backgroundColor: `${colors[props.nodeid % colors.length]}`, borderBottomLeftRadius: `${expand ? '0px' : '8px'}`, borderBottomRightRadius: `${expand ? '0px' : '8px'}`, borderBottom: `${expand ? '8px solid #e4eaf1' : 'none' }`, transition: `${!expand ? 'all .5s ease' : 'all 0s'}`, top: `${expand ? '-32px' : '0px'}` }} >
                {props.tablename}
            </div>
            
            <div className='tables' style={{maxHeight: `${expand ? '4000px' : '0px'}`, overflowY: `${expand ? 'visible' : 'hidden'}`, transition: `${!  expand ? 'all .6s ease' : 'all 0.6s ease'}`}} >
                {props.columns.map((column, i) => <Column name={column.name} id={`${column.name}#${i}`} key={`${column.name}#${i}`} nodeid={props.nodeid} index={i} dataType={column.dataType} edges={edges} expanded={expand} selected={selected} selectedEdges={props.selectedEdges} />)}
            </div>

            <div className='nodecontainer' />
            <div className='outline' style={{visibility: `${selected && expand ? 'visible' : 'hidden'}`}} />

            <style jsx>{`

            @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;700&display=swap');

                *{
                    font-size: 24px;
                    transition: all .6s ease;
                    font-family: 'Inter', sans-serif;
                    // font-family: 'Lato', sans-serif;
                    // font-family: 'Permanent Marker', cursive;
                }

                .node{
                    position: relative;
                    min-width: 500px;
                    background-color: #FAFAFA;
                    border-radius: 8px;
                    padding: 16px;
                    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.15));
                    cursor: default;
                    overflow: visible;
                    z-index: 100000;

                    &:hover{
                        filter: drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.15));
                    }
                    
                }

                .nodecontainer{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: #FAFAFA;
                    top: 0;
                    left: 0;
                    border-radius: 8px;
                    z-index: -999999998;
                }

                .outline {
                    transition: 0s;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: #0373fc;
                    top: -40px;
                    left: -8px;
                    padding: 24px 8px;
                    border-radius: 16px;

                    z-index: -999999999;

                }

                .tablename{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    font-size: 24px;
                    font-weight: 700;
                    left: 0%;
                    right: 0%;
                    // top: -32px;
                    text-align: center;
                    padding: 16px;  
                    color: black;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);
                }

                .tables{
                    // max-height: 250px;
                    // margin: 8px;
                    margin-top: 16px;
                    margin-bottom: 0px;
                    overflow-y: auto;
                    background-color: #FAFAFA;
                    z-index: 1000;
                    // overflow: visible;
                }

                ::-webkit-scrollbar {
                    width: 8px;
                    height: 100%;
                    background-color: #C4C4C4;
                }
                  
                ::-webkit-scrollbar-thumb {
                    background-color: #858585;
                    height: 10%;
                    border-radius: 5px;
                }

                .expandbtn{
                    z-index: 100;
                    position: absolute;
                }

            `}</style>

        </div>
    );
});