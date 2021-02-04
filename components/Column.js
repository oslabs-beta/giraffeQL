import { Handle } from 'react-flow-renderer';

const Column = (props) => {
    return (
        <div className='container'>

            <div className='column' className='left'>

                <Handle type='target' position='left' id={`id-${props.index}`} key={`id-${props.index}`}
                
                style={{
                    position: `${props.expanded ? 'relative' : 'absolute'}`, float: 'left', left: `${props.expanded ? '-46px' : '0%'}`, width: '16px', height: '16px', border: `${props.expanded ? '5px solid #0373fc' : 'transparent'}`, backgroundColor: 'transparent'
                }}

                onConnect={(params) => console.log('')}
                
                />
                {props.name}
            </div>

            <div className='column' className='right'>
                {props.dataType}

                <Handle type='source' position='right' id={`id-${props.index}`} key={`id-${props.index}`}
                
                style={{
                    position: `${props.expanded ? 'relative' : 'absolute'}`, float: 'right', left: `${props.expanded ? '62px' : '90%'}`, width: '16px', height: '16px', border: `${props.expanded ? '5px solid #0373fc' : 'transparent'}`, backgroundColor: 'transparent'
                }}

                onConnect={(params) => console.log('')}

                />
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
                    margin-right: 16px;
                }

            `}</style>

        </div>
    );
}

export default Column;