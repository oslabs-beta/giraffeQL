const ColumnOptions = (props) => {

    return (
        <div className='optioncontainer' style={{visibility: `${props.expanded ? 'visible' : 'hidden'}`}}>

            <h2>Options</h2>
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
                    width: 2%;
                    height: 4%;
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

                button{
                  font-weight: 500;
                  color: white;
                  // border-bottom: 2px solid #a0afc0;
                  margin: 0;
                  border: none;
                  outline: none;
                  background-color: transparent;
                  cursor: pointer;

                  &:hover{
                    color: darken(white, 20%)
                  }
                }

            `}</style>

        </div>
    );
}

export default ColumnOptions;