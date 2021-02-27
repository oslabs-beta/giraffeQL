import { useState, useEffect } from 'react';
import { useStore, useStoreState } from 'react-flow-renderer';

import { generateAllTypes } from '../../converters/typeDefs.js';

const SchemaIDE = (props) => {

    // Create instance of store
    const store = useStoreState((store) => store);

    const [tables, updateTable] = useState([]);

    const [schema, writeSchema] = useState([]);
    const [typeDefs, writeTypeDefs] = useState('');
    const [resolvers, writeResolvers] = useState('');

    const [activeCode, toggleCode] = useState(true);

    const [expand, showTable] = useState(true);

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
                newConnection.destinationKey = alphabet.indexOf(connection.targetHandle);

                newTable.connections.push(newConnection);

            });

            newTables.push(newTable);

        });

        updateTable(newTables);

    }, [props.updated]);

    // If tables array is changed, outputted schema is refreshed
    useEffect(() => {
        refreshSchema();
        // props.resetUpdate(false);
    }, [tables]);

    const refreshSchema = () => {
        writeSchema(generateAllTypes(tables));
    }

    useEffect(() => {
        writeTypeDefs(schema[0]);
        writeResolvers(schema[1]);
    }, [schema]);

    const downloadCode = () => {
        const url = window.URL.createObjectURL(new Blob([document.getElementById('unstyledcode').innerText]));
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', 'schema.js');

        document.getElementById('ide').appendChild(link);

        link.click();
    }

    return (

        <div id='schemacontainer' >

            <button className='schemabtn' onClick={() => showTable(!expand)} >{expand ? '>' : '<'}</button>

            {!expand ? '' : <div>
            
                <div id='ide' >

                    <div id='toggles'>
                        <button id='typedefs' onClick={() => toggleCode(true)} >TypeDefs</button>
                        <button id='resolvers' onClick={() => toggleCode(false)} >Resolvers</button>
                    </div>
                    
                    <pre style={{position: 'relative', width: '90%'}}><code className='hljs'> <div dangerouslySetInnerHTML={{
                        __html:
                            activeCode ? typeDefs : resolvers
                    }} /> </code></pre>

                    <div id='export'>
                        <button onClick={() => navigator.clipboard.writeText(document.getElementById('unstyledcode').innerText)} >Copy</button>
                        <button onClick={downloadCode} >Export</button>
                    </div>

                    <pre style={{opacity: '0', width: '0', height: '0'}}><code id='unstyledcode'><div dangerouslySetInnerHTML={{__html: schema.join('') }} /></code></pre>

                </div>

                <div id='buffer' />

            </div>}

            <style jsx>{`

                #schemacontainer{
                    position: fixed;
                    right: 0;
                    display: flex;
                    z-index: 99999999999999999999999999999;
                    pointer-events: none;
                }

                #ide {
                    height: 100%;
                    width:100%;
                    padding: 0px 16px;
                    margin-right: -5px;
                    background-color: white;
                    z-index: 999999998;
                    box-shadow: -3px 0px 3px rgba(0,0,0,.05);
                    pointer-events: auto;
                }

                #buffer{
                    position: relative;
                    height: 20%;
                    box-shadow: 0px -2px 4px -1px rgba(0,0,0,.15);
                    z-index: 9999999999999999999999999999999999;
                    background-color: white;
                }

                .schemabtn{
                    font-size: 24px;
                    font-family: 'Inter', sans-serif;
                    right: 0;
                    height: 37px;
                    padding: 4px 8px;
                    border-bottom-left-radius: 8px;
                    color: #6f8195;
                    background-color: #d8e3e8;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    z-index: 999999999999999999999999999999999999;
                    // transform: translateX(-32px);
                    pointer-events: auto;

                    &:hover{
                        color: #12b3ab;
                        background-color: #cad5e0;
                    }
                }

                #export{
                    display: flex;
                    justify-content: center;
                    margin: 0;

                    button{
                        transition: 0s;
                        position: relative;
                        border: none;
                        margin-right: 2em;
                        height: 3em;
                        width: 11em;
                        color: white;
                        background-color: #12b3ab;
                        padding: 8px;
                        outline: none;
                        box-shadow: inset 0px -2px 0px darken(#12b3ab, 20%), 0px -1px 0px #12b3ab;
                        z-index: 99999999999999999999;
        
                        &:hover{
                            box-shadow: inset 0px -1px 0px darken(#12b3ab, 20%);
                            cursor: pointer;
                        }
                    }
                }
                
                .hljs {
                    border-radius: 8px;
                    overflow: auto;
                    height: 80vh;
                    width: 350px;
                    display: block;
                    background: #1E1E1E;
                    font-size: 11px;
                    font-weight: 300;
                }
                        
                #toggles{
                    display: flex;
                    position: fixed;
                    z-index: 9999999;
                    right: 0;
                    margin: 8px 32px;
                }

                #typedefs{
                    font-size: 10px;
                    border: 1px solid #12b3ab;
                    border-radius: 4px;
                    padding: 8px;
                    outline: none;
                    color: #12b3ab;
                    background-color: transparent;
                    z-index: 99999999999999999999999999999999999999999999999;
                    opacity: .5;

                    &:hover{
                        cursor: pointer;
                        background-color: rgba(18, 179, 171, .25);
                        opacity: 1;
                    }
                }

                #resolvers{
                    font-size: 10px;
                    border: 1px solid #9b5de5;
                    border-radius: 4px;
                    padding: 8px;
                    outline: none;
                    color: #9b5de5;
                    background-color: transparent;
                    z-index: 99999999999999999999999999999999999999999999999;
                    margin-left: 8px;
                    opacity: .5;

                    &:hover{
                        cursor: pointer;
                        background-color: rgba(155, 93, 229, .25);
                        opacity: 1;
                    }
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

            `}</style>

        </div>
    );

}

export default SchemaIDE;