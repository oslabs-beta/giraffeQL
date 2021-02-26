const PreviewOptions = (props) => {

    return (
        <div className='optioncontainer' style={{visibility: `${props.expanded ? 'visible' : 'hidden'}`}}>

            <h1>Options</h1>
            <button onClick={() => {props.toggleOptions(false); props.toggleEdit(props.id)}} id='edit'>Edit</button>
            <button onClick={() => {props.toggleOptions(false); props.deleteDiagram(props.id)}} id='delete'>Delete</button>

            <style jsx>{`

                *{
                    font-size: 9px;
                }

                .optioncontainer{
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    margin-left: 256px;
                    margin-right: -25%;
                    padding: 0px 4px;
                    width: 50px;
                    height: 40px;
                    border-radius: 4px;
                    background-color: #2d3748;

                    &:before {
                        content:"";
                        position: absolute;
                        height: 0px;
                        width: 0px;
                        top: 15px;
                        left: -11px;
                        border-width: 6px;
                        border-color: transparent #2d3748 transparent transparent;
                        border-style: solid;
                    }
                }

                h1{
                    color: #a0afc0;
                    margin: 0;
                    margin-top: 2px;
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
                    color: darken(white, 20%);
                    background-color: lighten(#2d3748, 10%);
                    }
                }

            `}</style>

        </div>
    );
}

export default PreviewOptions;