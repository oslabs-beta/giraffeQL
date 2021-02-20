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
        const url = window.URL.createObjectURL(new Blob([document.getElementById('unstyledcode').innerText]));
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', 'schema.js');

        document.getElementById('ide').appendChild(link);

        link.click();
    }

    return (

        <div style={{ width: '33%', margin: '0' }} >

            <button className='schemabtn' onClick={() => showTable(!expand)} style={{ marginLeft: `${expand ? '0%' : '24.8%'}` }} >{expand ? '>' : '<'}</button>

            <div id='ide' style={{ opacity: `${expand ? '1' : '0'}` }} >

                <ul>
                    <li><button id='copy' onClick={() => navigator.clipboard.writeText(document.getElementById('unstyledcode').innerText)} >Copy</button></li>
                    <li><button id='download' onClick={downloadCode} >Export</button></li>
                </ul>

                <button id='typedefs' onClick={() => toggleCode(true)} >TypeDefs</button>
                <button id='resolvers' onClick={() => toggleCode(false)} >Resolvers</button>
                
                <pre style={{position: 'relative', width: '90%'}}><code className='hljs'> <div dangerouslySetInnerHTML={{
                    __html:
                        activeCode ? typeDefs : resolvers
                }} /> </code></pre>

                <pre style={{opacity: '0', width: '0', height: '0'}}><code id='unstyledcode'><div dangerouslySetInnerHTML={{__html: schema.join('') }} /></code></pre>

            </div>

            <style jsx>{`

                #ide {
                    height: 100vh;
                    padding: 0px 16px;
                    margin: 0;
                    right: 0;
                    background-color: white;
                    z-index: 999999998;
                    overflow: hidden;
                    box-shadow: -3px 0px 3px rgba(0,0,0,.05);
                }

                .schemabtn{
                    font-size: 24px;
                    font-family: 'Inter', sans-serif;
                    position: fixed;
                    padding: 4px 8px;
                    border-bottom-left-radius: 8px;
                    color: #6f8195;
                    background-color: #d8e3e8;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    z-index: 999999999999999999999999999999999999;
                    transform: translateX(-32px);

                    &:hover{
                        color: #12b3ab;
                        background-color: #cad5e0;
                    }
                }

                ul{
                    list-style-type: none;
                    display: flex;
                    justify-content: space-around;
                    margin: 0;

                    li{
                        margin: 0;
                        
                        button{
                          transition: 0s;
                          position: relative;
                          margin-top: 1.25em;
                          border: none;
                          height: auto;
                          width: 7em;
                          color: white;
                          background-color: #12b3ab;
                          padding: 8px;
                          outline: none;
                          box-shadow: inset 0px -2px 0px darken(#12b3ab, 20%), 0px -1px 0px #12b3ab;
                          z-index: 99999999999999999999;
                          
                          &:focus{
                            outline: none;
                          }
            
                          &:hover{
                            box-shadow: inset 0px -1px 0px darken(#12b3ab, 20%);
                            cursor: pointer;
                          }
                        }
                    }
                }

                #download {
                  background-color: #9b5de5;
                  box-shadow: inset 0px -2px 0px darken(#9b5de5, 20%), 0px -1px 0px #9b5de5;
                  margin-left: -1em;
    
                  &:hover{
                    box-shadow: inset 0px -1px 0px darken(#9b5de5, 20%);
                    cursor: pointer;
                    top: 1px;
                  }
                }
                
                .hljs {
                    border-radius: 8px;
                    overflow: auto;
                    height: 80vh;
                    width: 333px;
                    display: block;
                    background: #1E1E1E;
                    // text-overflow: ellipsis;
                    // white-space: nowrap;
                }
                        
                #typedefs{
                    font-size: 10px;
                    transition: all .2s linear;
                    position: fixed;
                    border: 1px solid #12b3ab;
                    border-radius: 4px;
                    padding: 8px;
                    outline: none;
                    color: #12b3ab;
                    background-color: transparent;
                    margin-top: 1.5%;
                    margin-left: 13%;
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
                    transition: all .2s linear;
                    position: fixed;
                    border: 1px solid #9b5de5;
                    border-radius: 4px;
                    padding: 8px;
                    outline: none;
                    color: #9b5de5;
                    background-color: transparent;
                    margin-top: 1.5%;
                    margin-left: 17.75%;
                    z-index: 99999999999999999999999999999999999999999999999;
                    opacity: .5;

                    &:hover{
                        cursor: pointer;
                        background-color: rgba(155, 93, 229, .25);
                        opacity: 1;
                    }
                }

                

            `}</style>

        </div>
    );

}

export default SchemaIDE;