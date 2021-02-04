import React, { useState, memo } from 'react';

import Column from './Column.js';
import Arrow from './icons/Arrow.js';

export default memo(({ data }) => {

    const props = data.label.props.children.props;

    const [expand, showTable] = useState();

    const colors=['#ff6b6b', '#f9844aff', '#fee440', '#02c39a', '#4361ee', '#9b5de5', '#f15bb5'];

    return (
        <div className='node' style={{minWidth: `${expand ? '500px' : '0px'}`}}>

            {/*<div className='header' style={{backgroundColor: `${colors[props.IEnumerable % colors.length]}`}} />*/}
            <div onDoubleClick={() => showTable(!expand)} className='tablename' style={{backgroundColor: `${colors[props.IEnumerable % colors.length]}`, borderBottomLeftRadius: `${expand ? '0px' : '8px'}`, borderBottomRightRadius: `${expand ? '0px' : '8px'}`, borderBottom: `${expand ? '8px solid #e4eaf1' : 'none' }`}} >
                {props.tablename}
            </div>
            
            <div className='tables' style={{maxHeight: `${expand ? '250px' : '0px'}`}} >
                {props.columns.map((column, i) => <Column name={column.name} id={`${column.name}#${i}`} key={`${column.name}#${i}`} index={i} dataType={column.dataType} />)}
            </div>

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
                    background: #FAFAFA;
                    border-radius: 8px;
                    padding: 16px;
                    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.15));
                    cursor: default;

                    &:hover{
                        filter: drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.15));
                    }
                    
                }

                .header{
                    position: absolute;
                    height: 1.5em;
                    font-weight: bold;
                    left: 0%;
                    right: 0%;
                    bottom: 90%;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    text-align: center;
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
                    top: -20%;
                    text-align: center;
                    padding: 16px;  
                    color: black;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    // color: #495667;
                    // background-color: #f8fafc;
                    // border: 2px solid #edf1f6;
                }

                .tables{
                    // max-height: 250px;
                    overflow-y: auto;
                    margin: 8px;
                    margin-top: 16px;
                    margin-bottom: 0px;
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


// <Handle
// type="source"
// position="right"
// id="a"
// style={{ top: 10, background: '#555' }}
// />

// <Handle
// type="source"
// position="right"
// id="b"
// style={{ bottom: 10, top: 'auto', background: '#555' }}
// />