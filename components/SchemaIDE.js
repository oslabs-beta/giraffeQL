import { useState, useEffect } from 'react';
import { useStoreState } from 'react-flow-renderer';

import generateAllTypes from '../converters/typeDefs.js';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

const SchemaIDE = (props) => {

    // Create instance of store
    const store = useStoreState((store) => store);

    const [tables, updateTable] = useState([]);
    const [schema, writeSchema] = useState('');

    // Tells code highlighter which language to read.
    useEffect(() => {
        hljs.registerLanguage("javascript", javascript);
    }, []);

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

    // Simultaneously, highlighting is updated
    // TODO: Need to get highlighting working. 
    useEffect(() => {
        hljs.initHighlighting();
    }, [schema]);

    const refreshSchema = () => {
        writeSchema(generateAllTypes(tables));
    }

    return (
        <div id='ide' >

            <div className='sidebar' >

                <div id='gql'><h1>GraphQL</h1><h2>Query</h2></div>
                <button onClick={()=>navigator.clipboard.writeText(schema)}>Copy</button>
                <pre><code>{schema}</code></pre>

            </div>

            <style jsx>{`

                #ide {
                    position: fixed;
                    height: 100%;
                    width: 20%;
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

                .hljs{
                    border-radius: 8px;
                    overflow: auto;
                    height: 600px;
                }

                ::-webkit-scrollbar {
                    width: 5px;
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

                button{
                    position: fixed;
                    color: #12b3ab;
                    border: 1px solid #12b3ab;
                    border-radius: 4px;
                    padding: 8px;
                    outline: none;
                    background-color: transparent;
                    margin-top: 20px;
                    margin-left: 246px;

                    &:hover{
                        cursor: pointer;
                        background-color: #1a4949;
                    }
                }

            `}</style>

        </div>
    );

}

export default SchemaIDE;