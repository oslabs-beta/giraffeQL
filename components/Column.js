import { Handle } from 'react-flow-renderer';

const Column = (props) => {
    console.log(props)
    return (
        <div className='container'>

            <div className='column' className='left'>
                <Handle type='target' position='left' id={`id-${props.index}`} key={`id-${props.index}`} style={{
                    position: 'relative', float: 'left', left: -12, backgroundColor: 'transparent'
                }} />
                {props.name}
            </div>

            <div className='column' className='right'>
                {props.dataType}
                <Handle type='source' position='right' id={`id-${props.index}`} key={`id-${props.index}`} style={{
                    position: 'relative', float: 'right', left: 27, backgroundColor: 'transparent'
                }} />
            </div>

            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');

                *{
                    font-size: 16px;
                    transition: all .3s;
                    // font-family: 'Lato', sans-serif;
                    font-family: 'Inter', sans-serif;
                }

                .container{
                    display: flex;
                    justify-content: space-between;
                    padding: 8px;
                    border-top: .5px solid transparent;
                    border-bottom: .5px solid #e4eaf1;
                    overflow: hidden;
                    flex-flow: row nowrap;

                    &:hover{
                        border-top: .5px solid #0373fc;
                        border-bottom: .5px solid #0373fc;
                    }

                    &:hover > .left{
                        color: #9f7ce8;
                    }
                    
                    &:hover > .right{
                        color: #9f7ce8;
                    }

                    &:active{
                        background-color: #eaf4ff;
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
                    margin-right: 16px;
                }

            `}</style>

        </div>
    );
}

export default Column;