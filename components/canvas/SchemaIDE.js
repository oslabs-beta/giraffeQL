import { useState, useEffect } from 'react';
import { useStore, useStoreState } from 'react-flow-renderer';

import generateAllTypes from '../../converters/typeDefs.js';

const SchemaIDE = (props) => {

    // Create instance of store
    const store = useStoreState((store) => store);

    const [tables, updateTable] = useState([]);

    const [schema, writeSchema] = useState([]);
    const [typeDefs, writeTypeDefs] = useState('');
    const [resolvers, writeResolvers] = useState('');

    const [activeCode, toggleCode] = useState(true);

    // Taking the data from all nodes/elements whenever there is a change and turning them back to original format. 
    useEffect(() => {

        const newTables = [];

        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        // ONLY iterating through the node's by filtering out the connections.
        store.elements.filter(node => !node.id.includes('reactflow')).forEach((node, i) => {

            const newTable = {};

            newTable.name = node.data.label.props.children.props.tablename;
            newTable.columns = node.data.label.props.children.props.columns;
            newTable.connections = [];

            // Iterate through the nodes connections
            store.elements.filter(connection => connection.id.includes('reactflow') && connection.source === i.toString()).forEach(connection => {

                const newConnection = {};

                const targetNode = store.elements.findIndex(target => target.id === connection.target.toString());

                newConnection.originKey = alphabet.indexOf(connection.sourceHandle);
                newConnection.destinationTable = store.elements[targetNode].data.label.props.children.props.tablename;
                newConnection.destinationKey= alphabet.indexOf(connection.targetHandle);

                newTable.connections.push(newConnection);

            });

            newTables.push(newTable);

        });

        updateTable(newTables);

    }, [props.updated]);

    // If tables array is changed, outputted schema is refreshed
    useEffect(() => {
        refreshSchema();
        props.resetUpdate(false);
    }, [tables]);

    const refreshSchema = () => {
        writeSchema(generateAllTypes(tables));
    }

    useEffect(() => {
        writeTypeDefs(schema[0]);
        writeResolvers(schema[1]);
    }, [schema]);

    const downloadCode = () => {
        const url = window.URL.createObjectURL(new Blob([document.getElementById('schema').innerText]));
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', 'schema.js');

        document.getElementById('ide').appendChild(link);

        link.click();
    }

    return (
        <div id='ide' >

            <div className='sidebar' >

                <ul>
                    <li><button onClick={()=>toggleCode(true)}>TypeDefs</button></li>
                    <li><button onClick={()=>toggleCode(false)}>Resolvers</button></li>
                </ul>

                <button id='copy' onClick={()=>navigator.clipboard.writeText(document.getElementById('schema').innerText)}>Copy</button>
                <button id='download' onClick={downloadCode}>Export</button>
                <pre><code id='schema' className='hljs'> <div dangerouslySetInnerHTML={{ __html:
                    activeCode ? typeDefs : resolvers
                }} /> </code></pre>

            </div>

            <style jsx>{`

                #ide {
                    position: fixed;
                    height: 100%;
                    width: 25%;
                    padding: 0px 16px;
                    margin: 0;
                    right: 0;
                    background-color: white;
                    z-index: 999999998;
                    overflow: hidden;
                    box-shadow: -3px 0px 3px rgba(0,0,0,.05);
                }

                ul{
                    list-style-type: none;
                    display: flex;
                    margin: 0;

                    li{
                        margin: 0;
                        
                        button{
                            padding: 8px;
                            margin: 0;
                        }
                    }
                }

                .hljs {
                    border-radius: 8px;
                    overflow: auto;
                    height: 600px;
                    display: block;
                    background: #1E1E1E;
                }
                        
                #copy{
                    position: fixed;
                    color: #12b3ab;
                    border: 1px solid #12b3ab;
                    border-radius: 4px;
                    padding: 8px;
                    outline: none;
                    background-color: transparent;
                    margin-top: 20px;
                    margin-left: 260px;

                    &:hover{
                        cursor: pointer;
                        background-color: rgba(18, 179, 171, .25);
                    }
                }

                #download{
                    position: fixed;
                    color: #9b5de5;
                    border: 1px solid #9b5de5;
                    border-radius: 4px;
                    padding: 8px;
                    outline: none;
                    background-color: transparent;
                    margin-top: 20px;
                    margin-left: 315px;

                    &:hover{
                        cursor: pointer;
                        background-color: rgba(155, 93, 229, .25);
                    }
                }

            `}</style>

        </div>
    );

}

export default SchemaIDE;