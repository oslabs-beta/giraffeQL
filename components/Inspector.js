import { useState } from 'react';
import ColumnInspector from './ColumnInspector.js';

const Inspector = (data) =>{

    //We access our "props" by going into the passed in data and extracting it from several nested objects
    //This is only necessaray because of how data gets passed by the element label
    const props = data.data.data.label.props.children.props;

    const colors=['#ff6b6b', '#f9844aff', '#fee440', '#02c39a', '#4361ee', '#9b5de5', '#f15bb5'];

    return (
        <div id='inspector'>

            <div id='tablename' style={{backgroundColor: `${colors[props.nodeid % colors.length]}`}} >{props.tablename}</div>

            {props.columns.map((column, i) => <ColumnInspector name={column.name} id={`${column.name}#${i}`} key={`${column.name}#${i}`} dataType={column.dataType} />)}

            <style jsx>{`

                *{
                    font-family: 'Inter', sans-serif;
                }

                #inspector {
                    position: fixed;
                    height: 100%;
                    width: 20%;
                    float: left;
                    background-color: white;
                    z-index: 999999998;
                    border-right: 4px solid #e4eaf1;
                    box-shadow: 16px 0px 16px rgba(0,0,0,.15);
                }

                #tablename{
                    font-size: 24px;
                    text-align: center;
                    background-color: blue;
                    padding: 16px;
                }

            `}</style>
        </div>
    );

}

export default Inspector;