import { useEffect, useState } from 'react';

const ColumnInspector = (props) => {

    const [name, setName] = useState(props.name);
    const [type, setType] = useState(props.dataType);

    useEffect(() => {

        if (!props.editable)
            return;

        var newNode = JSON.parse(JSON.stringify(props.activeNode))

        newNode.data.label.props.children.props.columns[props.index].name = name;
        newNode.data.label.props.children.props.columns[props.index].dataType = type;

        props.updateNode(newNode);

    }, [name, type]);

    const dataTypes = ['integer', 'bigint', 'date', 'character varying'];

    return (
        <div className='container' style={{backgroundColor: `${props.editable ? '#c0dbfd' : 'transparent'}`}}>

            {/* Our Table component is split into two columns: the column name and it's associated Data Type.*/}

            <input type='text' value={name} className='column' className='left' onChange={(e)=>setName(e.target.value)} disabled={props.editable ? '' : 'disabled'} style={{color: `${props.editable ? '#4754bd' : '#5e6f7a'}`}} />

            <input type='text' list='types' value={type} placeholder={type} className='column' className='right' onChange={(e)=>setType(e.target.value)} disabled={props.editable ? '' : 'disabled'} style={{color: `${props.editable ? '#4754bd' : '#cccccc'}`}} />
            <datalist id='types'>{dataTypes.map((datatype, i) => <option key={`datatype#${i}`} value={datatype} /> )}</datalist>

            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');

                *{
                    font-size: 12px;
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
                    flex: 25%;
                }

                .left{
                    font-weight: bold;
                    color: #5e6f7a;
                    margin-right: 32px;
                }

                .right{
                    color: #cccccc;
                }

            `}</style>

        </div>
    );
}

export default ColumnInspector;