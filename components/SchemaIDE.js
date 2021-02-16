import { useState, useEffect } from 'react';
import { useStoreState } from 'react-flow-renderer';

import generateAllTypes from '../converters/typeDefs.js';

const SchemaIDE = (props) => {

    // Create instance of store
    const store = useStoreState((store) => store);

    const [tables, updateTable] = useState([]);
    const [typeDefs, writeTypeDefs] = useState('');
    const [resolvers, writeResolvers] = useState('');
    const [schema, writeSchema] = useState([]);
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

                <div id='gql'><h1>GraphQL</h1><h2>Query</h2></div>
                <button onClick={()=>toggleCode(!activeCode)}>TAB</button>
                <button id='copy' onClick={()=>navigator.clipboard.writeText(document.getElementById('schema').innerText)}>Copy</button>
                <button id='download' onClick={downloadCode}>Export</button>
                <pre><code id='schema' className='hljs'> <div dangerouslySetInnerHTML={{ __html: activeCode ? typeDefs : resolvers }} /> </code></pre>

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

                #gql{
                    display: flex;
                    align-items: center;
                    margin-top: 12px;
                }

                h1{
                    font-family: 'Inter', sans-serif;
                    font-weight: 300;
                    line-height: 0;
                    color: #e10098;
                    margin: 0;
                }

                h2{
                    font-family: 'Inter', sans-serif;
                    font-weight: 300;
                    line-height: 0;
                    color: white;
                    background-color: #38b2ac;
                    padding: 24px 8px;
                    border-radius: 16px 8px;
                    margin: 0;
                }

                .hljs {
                    border-radius: 8px;
                    overflow: auto;
                    height: 600px;
                    display: block;
                    padding: 0.5em;
                    background: #1E1E1E;
                    color: #DCDCDC;
                }
                                
                ::-webkit-scrollbar {
                    width: 5px;
                    height: 5px;
                }

                ::-webkit-scrollbar-track {
                    background: transparent;
                }

                ::-webkit-scrollbar-thumb {
                    background: #454954;
                    border-radius: 16px;
                    border-right: none;
                    border-left: none;
                }

                ::-webkit-scrollbar-track-piece:end {
                    background: transparent;
                    margin-bottom: 16px; 
                }
                
                ::-webkit-scrollbar-track-piece:start {
                    background: transparent;
                    margin-top: 16px;
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