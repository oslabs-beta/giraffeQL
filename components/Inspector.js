import { useState } from 'react';

import ColumnInspector from './ColumnInspector.js';
import Pencil from './icons/Pencil.js';

const Inspector = (data) =>{

    //We access our "props" by going into the passed in data and extracting it from several nested objects
    //This is only necessaray because of how data gets passed by the element label
    const props = data.data.data.label.props.children.props;

    const [expand, showTable] = useState(true);
    const [editable, toggleEdit] = useState(false);

    const colors=['#ff6b6b', '#f9844aff', '#fee440', '#02c39a', '#4361ee', '#9b5de5', '#f15bb5'];

    return (
        <div id='inspector' style={{transform: `${expand ? '' : 'translateX(-360px)' }`}} >

            <button onClick={()=>showTable(!expand)} style={{transform: `${expand ? '' : 'translateX(278px)' }`}} >{expand ? '<' : '>'}</button>

            <div id='sidebar' >

                <div onClick={()=>toggleEdit(!editable)} ><Pencil /></div>
                <div id='tablename' style={{borderLeft: `8px solid ${colors[props.nodeid % colors.length]}`}} >{props.tablename}</div>

                {props.columns.map((column, i) => <ColumnInspector name={column.name} id={`${column.name}#${i}`} key={`${column.name}#${i}`} dataType={column.dataType} editable={editable} />)}

            </div>

            <style jsx>{`

                *{
                    font-family: 'Inter', sans-serif;
                }

                #inspector {
                    position: fixed;
                    height: 100%;
                    width: 23%;
                    float: left;
                    background-color: white;
                    z-index: 999999998;
                    box-shadow: 3px 0px 3px rgba(0,0,0,.05);
                }

                #tablename{
                    font-size: 24px;
                    text-align: left;
                    background-color: white;
                    padding: 16px;
                    // border-bottom: 3px solid #b8c2cc;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
                }

                button{
                    font-size: 24px;
                    font-family: 'Inter', sans-serif;
                    position: fixed;
                    padding: 4px 8px;
                    // border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                    margin-left: 23%;
                    margin-top: 0;
                    background-color: #e4eaf1;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    z-index: 9999999999;

                    &:hover{
                        background-color: #ababab;
                    }
                }

            `}</style>
        </div>
    );

}

export default Inspector;