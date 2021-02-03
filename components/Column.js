const Column = (props) => {
    return (
        <div className='container'>
            <div className='column' className='left'>{props.name}</div>
            <div className='column' className='right'>{props.dataType}</div>

            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');

                *{
                    font-size: 12px;
                    transition: all .25s;
                    font-family: 'Lato', sans-serif;
                }

                .container{
                    display: flex;
                    justify-content: space-between;
                    padding: 5px;
                    border-top: .5px solid transparent;
                    border-bottom: .5px solid transparent;
                }

                .container:hover{
                    border-top: .5px solid #0373fc;
                    border-bottom: .5px solid #0373fc;
                }

                .column{
                    flex: 50%;
                }

                .left{
                    font-weight: bold;
                    margin-right: 32px;
                }

                .right{
                    color: #999999;
                }

            `}</style>

        </div>
    );
}

export default Column;