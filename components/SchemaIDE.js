import { useState, useEffect } from 'react';
import { useStoreState } from 'react-flow-renderer';

import generateAllTypes from '../converters/typeDefs.js';

import hljs from 'highlight.js';
// import hljsDefineGraphQL from 'highlightjs-graphql';
import javascript from 'highlight.js/lib/languages/javascript';

const SchemaIDE = (props) => {

    const store = useStoreState((store) => store);

    const [tables, updateTable] = useState([]);
    const [schema, writeSchema] = useState('');

    useEffect(() => {
        hljs.registerLanguage("javascript", javascript);
        // hljsDefineGraphQL(hljs);
    }, []);

    useEffect(() => {

        // if (!props.updated)
        //     return;

        const newTables = [];

        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        store.elements.filter(node => !node.id.includes('reactflow')).forEach((node, i) => {

            const newTable = {};

            newTable.name = node.data.label.props.children.props.tablename;
            newTable.columns = node.data.label.props.children.props.columns;
            newTable.connections = [];

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

    useEffect(() => {
        refreshSchema();
        props.resetUpdate(false);
    }, [tables]);

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

            `}</style>

        </div>
    );

}

export default SchemaIDE;