const ColumnOptions = (props) => {

    return (
        <div className='optioncontainer' style={{visibility: `${props.expanded ? 'visible' : 'hidden'}`}}>

            <h2>Options</h2>
            <h1>Edit</h1>
            <h1>Delete</h1>

            <style jsx>{`

                *{
                    font-size: 9px;
                }

                .optioncontainer{
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    margin-top: -10px;
                    margin-left: 390px;
                    padding: 8px;
                    width: 50px;
                    height: 50px;
                    border-radius: 4px;
                    background-color: #2d3748;
                }

                h1{
                    font-weight: 500;
                    color: white;
                    // border-bottom: 2px solid #a0afc0;
                    margin: 0;
                }

                h2{
                    color: #a0afc0;
                }

            `}</style>

        </div>
    );
}

export default ColumnOptions;