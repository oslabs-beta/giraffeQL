import { Handle } from 'react-flow-renderer';
import { useState } from 'react';

const Column = (props) => {

    const [selected, selectColumn] = useState(false);

    return (
        <div className='container' onMouseOver={()=>selectColumn(true)} onMouseLeave={()=>selectColumn(false)}>

            {/* Our Table component is split into two columns: the column name and it's associated Data Type.
                Each of these also contains an input (target) and output (source) "Handle" component that allows
                Nodes to connect.*/}

            {/* TODO: Refactor positioning of Handles to allow for overflow-y scrolling */}

            <div className='column' className='left'>

                <Handle type='target' position='left' id={`id-${props.index}`} key={`id-${props.index}`}
                
                /* Handle Styling */
                style={{
                    position: `${props.expanded ? 'relative' : 'absolute'}`, float: 'left', left: `${props.expanded ? '-40px' : '0%'}`, width: '16px', height: '16px', border: `${props.expanded && selected ? '5px solid #0373fc' : '5px solid transparent'}`, backgroundColor: 'transparent'
                }}

                onConnect={(params) => console.log('')}
                
                />

                {/* Column Name */}
                {props.name}

            </div>

            <div className='column' className='right'>
            
                {/* Data Type */}
                {props.dataType}

                <Handle type='source' position='right' id={`id-${props.index}`} key={`id-${props.index}`}
                
                /* Handle Styling */
                style={{
                    position: `${props.expanded ? 'relative' : 'absolute'}`, float: 'right', left: `${props.expanded ? '40px' : '90%'}`, width: '16px', height: '16px', border: `${props.expanded && selected ? '5px solid #0373fc' : '5px solid transparent'}`, backgroundColor: 'transparent'
                }}

                onConnect={(params) => console.log('')}

                />
            </div>

            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');

                *{
                    font-size: 16px;
                    transition: all 0s;
                    // font-family: 'Lato', sans-serif;
                    font-family: 'Inter', sans-serif;
                }

                .handle {
                    border: 5px solid red;
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

export default Column;