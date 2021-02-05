import ColumnInspector from './ColumnInspector.js';

import Pencil from './icons/Pencil.js';

const Inspector = (data) =>{

    //We access our "props" by going into the passed in data and extracting it from several nested objects
    //This is only necessaray because of how data gets passed by the element label
    const props = data.data.data.label.props.children.props;

    const colors=['#ff6b6b', '#f9844aff', '#fee440', '#02c39a', '#4361ee', '#9b5de5', '#f15bb5'];

    return (
        <div id='inspector'>

            <Pencil />
            <div id='tablename' style={{borderLeft: `8px solid ${colors[props.nodeid % colors.length]}`}} >{props.tablename}</div>

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
                    box-shadow: 3px 0px 3px rgba(0,0,0,.05);
                }

                #tablename{
                    font-size: 24px;
                    text-align: left;
                    background-color: white;
                    padding: 16px;
                    // border-bottom: 3px solid #b8c2cc;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);
                }

            `}</style>
        </div>
    );

}

export default Inspector;