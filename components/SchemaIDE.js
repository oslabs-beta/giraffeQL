import Prism from "prismjs";

import { useState, useEffect } from 'react';
import { useStoreState } from 'react-flow-renderer';

import generateAllTypes from '../converters/TypeDefs.js';

const SchemaIDE = (props) => {

    const store = useStoreState((store) => store);

    const [tables, updateTable] = useState([]);
    const [schema, writeSchema] = useState('');

    useEffect(() => {
        
        const newTables = [];

        store.elements.filter(node => !node.id.includes('reactflow')).forEach(node => {

            const newTable = {};

            newTable.name = node.data.label.props.children.props.tablename;
            newTable.columns = node.data.label.props.children.props.columns;

            newTables.push(newTable);

        });

        updateTable(newTables);

    }, [store.elements]);

    const logTheTable = () => {
        writeSchema(generateAllTypes(tables));
        console.log(schema);
    }

    useEffect(() => {
        console.log('is this thing on?');
        Prism.highlightAll();
    });

    return (
        <div id='ide'>

            <button onClick={logTheTable}>yoooooooo!</button>

            <pre className="cms-code"><code className="language-javascript">{schema}</code></pre>

            <style jsx>{`

                *{
                    font-family: 'Inter', sans-serif;
                }

                #ide {
                    // position: fixed;
                    // height: 100%;
                    // width: 33%;
                    // right: 0;
                    // background-color: white;
                    // z-index: 999999998;
                    // box-shadow: -3px 0px 3px rgba(0,0,0,.05);
                }
                
                // code{
                //     font-size: 16px;
                //     color: break;
                // }

            `}</style>

        </div>
    );

}

export default SchemaIDE;