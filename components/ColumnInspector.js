import { useEffect, useState } from 'react';
import { useStoreState } from 'react-flow-renderer';

import ColumnOptions from './ColumnOptions.js';

const ColumnInspector = (props) => {

    // Create instance of store.
    const store = useStoreState((store) => store);

    const [name, setName] = useState(props.name);
    const [type, setType] = useState(props.dataType);
    const [required, setRequired] = useState(props.isRequired);
    const [prevNode, nextNode] = useState(null);
    
    const [options, toggleOptions] = useState(false);
    
    useEffect(() => {
      if (props.expandedOptions === null) {
        toggleOptions(false);
        return;
        };

      if (props.expandedOptions === props.index) toggleOptions(true)
      else toggleOptions(false);

    }, [props.expandedOptions])
    // Whenever name or datatype changes, we update the info and push it back up to the inspector's activeNode. 
    useEffect(() => {

        if (!store.selectedElements)
            return;

        if (!props.editable || prevNode !== store.selectedElements[0])
            return;
        const newNode = JSON.parse(JSON.stringify(props.activeNode));

        newNode.data.label.props.children.props.columns[props.index].name = name;
        newNode.data.label.props.children.props.columns[props.index].dataType = type;
        newNode.data.label.props.children.props.columns[props.index].required = required;

        props.updateNode(newNode);

    }, [name, type, required]);

    // When selected Node changes, the inspector changes to new node. 
    useEffect(() => {
        
        if (!store.selectedElements)
            return;
                
        nextNode(store.selectedElements[0]);

    }, [store.selectedElements])

    const changePrimary = () =>{

        if (props.activePrimary === props.index)
            return;

        props.switchPrimary(props.index);

    }

    const dataTypes = ['integer', 'bigint', 'date', 'character varying', 'boolean'];

    return (
        <div className='container' style={{backgroundColor: `${props.editable ? '#c0dbfd' : 'transparent'}`}} onDoubleClick={props.onDoubleClick}>

            {/* Our Table component is split into two columns: the column name and it's associated Data Type.*/}

            <input type='text' value={name} className='column' className='left' onChange={(e)=>setName(e.target.value)} disabled={props.editable ? '' : 'disabled'} style={{color: `${props.editable ? '#4754bd' : '#5e6f7a'}`}} />

            <input type='text' list='types' placeholder={type} className='column' className='right' onChange={(e)=>setType(e.target.value)} disabled={props.editable ? '' : 'disabled'} style={{color: `${props.editable ? '#4754bd' : '#cccccc'}`}} />
                {/* List of data-types */}
                {/* TODO: Make this work!! Gets overwritten once a value is selected. */}
                <datalist id='types'>{dataTypes.map((datatype, i) => <option key={`datatype#${i}`} value={datatype} /> )}</datalist>

            <input type='checkbox' disabled={props.editable ? '' : 'disabled'} checked={required} onChange={()=> setRequired(!required)} className='column' className='right' style={{color: `${props.editable ? '#4754bd' : '#cccccc'}`}} />

            <button onClick={changePrimary} disabled={props.editable ? '' : 'disabled'} className='column' className='right' className='primarykey' >
                <div className='star'>
                    <svg width={24} height={24} viewBox="0 0 24 24" ><path fill={`${props.isPrimary ? '#0373fc' : 'transparent' }`} d="M12 .587l3.668 7.568L24 9.306l-6.064 5.828 1.48 8.279L12 19.446l-7.417 3.967 1.481-8.279L0 9.306l8.332-1.151z" /></svg>
                </div>
            </button>

            <button onClick={()=> toggleOptions(props.options ? props.setOptionsMenu(null) : props.setOptionsMenu(props.index) )} className='column' className='columnoptions'>{`⋮`}</button> <ColumnOptions setOptionsMenu={props.setOptionsMenu} index={props.index} deleteColumn={props.deleteColumn} expanded={options} className='optionmodal' />

            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');

                *{
                    font-size: 9px;
                    transition: all 0s;
                    font-family: 'Inter', sans-serif;
                }

                .container{
                    display: flex;
                    justify-content: space-between;
                    padding: 8px;
                    border-top: .5px solid transparent;
                    border-bottom: .5px solid #e4eaf1;
                    flex-flow: row nowrap;

                    &:hover{
                        border-top: .5px solid #0373fc;
                        border-bottom: .5px solid #0373fc;
                    }
                    
                    &:active{
                        border-top: .5px solid #0373fc;
                        border-bottom: .5px solid #0373fc;
                    }

                    &:active > .left{
                        color: #0373fc;
                    }

                    &:active > .right{
                        color: #0373fc;
                    }
                }

                input{
                    width: 128px;
                    border: #e4eaf1;
                    background-color: transparent;
                    outline: none;

                    ::placeholder{
                        color: #cccccc;
                    }
                }

                .column{
                    flex: 20%;
                }

                .left{
                    font-weight: bold;
                    color: #5e6f7a;
                    // margin-right: 32px;
                }

                .right{
                    color: #cccccc;
                }

                .columnoptions{
                    font-size: 16px;
                    font-weight: bold;
                    border: none;
                    outline: none;
                    background-color: transparent;
                    color: #12b3ab;
                    cursor: pointer;
                }

                .primarykey{
                    border: none;
                    outline: none;
                    background-color: transparent;
                }

                .star{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 6px;
                    transform: scale(.5);
                    height: 0;
                    margin-bottom: 5px;

                    svg{
                        path{
                            stroke-width: 2;
                            stroke: #6f8195;
                        }
                    }

                    svg{
                        &:hover > path{
                            stroke: #0373fc;
                        }
                    }
                }

            `}</style>

        </div>
    );
}

export default ColumnInspector;