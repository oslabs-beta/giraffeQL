import React from 'react';

const Column = (props) => {
    return (
        <div className='container'>
            <div className='column' className='left'>{props.name}</div>
            <div className='column' className='right'>{props.dataType}</div>

            <style jsx>{`

                *{
                    font-size: 12px;
                }

                .container{
                    display: flex;
                    justify-content: space-between;
                }

                .column{
                    flex: 50%;
                }

            `}</style>

        </div>
    );
}

export default Column;