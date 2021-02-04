import { useState } from 'react';

const ColumnInspector = (props) => {

    return (
        <div className='container'>

            {/* Our Table component is split into two columns: the column name and it's associated Data Type.*/}

            <div className='column' className='left'>{props.name}</div>

            <div className='column' className='right'>{props.dataType}</div>

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