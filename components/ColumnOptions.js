const ColumnOptions = (props) => {

    return (
        <div className='optioncontainer' style={{visibility: `${props.expanded ? 'visible' : 'hidden'}`}}>

            <h1>Options</h1>
            <button id='edit'>Edit</button>
            <button onClick={()=> {props.setOptionsMenu(null); props.deleteColumn(props.index)}} id='delete'>Delete</button>

            <style jsx>{`

                *{
                    font-size: 9px;
                }

                .optioncontainer{
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    margin-top: -10px;
                    margin-left: 25%;
                    padding: 8px;
                    width: 50px;
                    height: 50px;
                    border-radius: 4px;
                    background-color: #2d3748;
                }

                h1{
                    color: #a0afc0;
                }

                button{
                  color: white;
                  margin: 0;
                  border: none;
                  outline: none;
                  background-color: transparent;
                  cursor: pointer;
                  text-align: left;

                  &:hover{
                    color: darken(white, 20%)
                  }
                }

            `}</style>

        </div>
    );
}

export default ColumnOptions;