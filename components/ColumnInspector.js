import { useState } from 'react';

const ColumnInspector = (props) => {

    const [name, setName] = useState(props.name);
    const [type, setType] = useState(props.dataType);

    const dataTypes = ['integer', 'bigint', 'date', 'character vary'];

    return (
        <div className='container'>

            {/* Our Table component is split into two columns: the column name and it's associated Data Type.*/}

            <input type='text' value={name} placeholder={name} className='column' className='left' onChange={(e)=>setName(e.target.value)} />

            <input type='text' list='types' placeholder={type} className='column' className='right' onChange={(e)=>setType(e.target.value)} />
            <datalist id='types'>
                {dataTypes.map((datatype, i) => <option key={`datatype#${i}`} value={datatype} /> )}
            </datalist>

            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');

                *{
                    font-size: 12px;
                    transition: all 0s;
                    // font-family: 'Lato', sans-serif;
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

                    &:hover > .left{
                        // color: #0373fc;
                    }
                    
                    &:hover > .right{
                        // color: #0373fc;
                    }

                    &:active{
                        border-top: .5px solid #0373fc;
                        border-bottom: .5px solid #0373fc;
                        background-color: #eaf4ff;
                    }

                    &:active > .left{
                        color: #0373fc;
                    }

                    &:active > .right{
                        color: #0373fc;
                    }
                }

                input{
                    width: 100px;
                    border: #e4eaf1;
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
                    // margin-right: 16px;
                }

            `}</style>

        </div>
    );
}

export default ColumnInspector;