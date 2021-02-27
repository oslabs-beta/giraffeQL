import Image from 'next/image'

import { useState } from 'react';

import PreviewOptions from './PreviewOptions.js';

import moment from 'moment';

const DiagramPreview = (props) => {

    const [options, toggleOptions] = useState(false);
    const [image, setImage] = useState('/logo.svg');
    const [favorite, setFavorite] = useState(props.favorite);

    const colors=['#ff6b6b', '#f9844aff', '#fee440', '#02c39a', '#4361ee', '#9b5de5', '#f15bb5'];

    const toggleFavorite = () => {
        const fetchURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://giraffeql.io';
        fetch(`${fetchURL}/diagrams/favorite/${props.id}`, {method: 'PUT', headers: {'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then(data => setFavorite(data.diagram.favorite));
    }

    const date = moment(props.updated).calendar();

    return (
        <div className='diagram'>

            <button className='optionstoggle' onClick={()=> toggleOptions(!options)}>{`...`}</button>
            <PreviewOptions toggleOptions={toggleOptions} id={props.id} data={props.data} toggleEdit={props.toggleEdit} deleteDiagram={props.deleteDiagram} expanded={options} />

            <div className='header' style={{backgroundColor: `${props.color === null ? colors[props.index % colors.length] : props.color}`}} onClick={() => props.selectDiagram(props.id)} ></div>

            <div className='previewcontainer' onClick={() => props.selectDiagram(props.id)}>
                <Image 
                src={image}
                width={64}
                height={64}
                />
            </div>

            <div className='contents'>
                <div className='nameandstar' >
                    <div className='dgname'>{props.name}</div>

                    <div className='star' onClick={toggleFavorite} >
                        <svg width={24} height={24} viewBox="0 0 24 24" ><path fill={`${favorite ? '#0373fc' : 'transparent' }`} d="M12 .587l3.668 7.568L24 9.306l-6.064 5.828 1.48 8.279L12 19.446l-7.417 3.967 1.481-8.279L0 9.306l8.332-1.151z" /></svg>
                    </div>
                </div>
            </div>

            <div className='dgdesc'>{props.description}<br/><span style={{color: '#a1afbf', fontSize: '9px'}}>Last updated {date}</span></div>

            <style jsx>{`

                *{
                    font-family: 'Inter', sans-serif;
                    transition: all .2s;
                }

                .diagram{
                    width: 250px;
                    height: 200px;
                    background-color: white;
                    border-radius: 8px;
                    border: 2px solid #edf2f7;
                    margin: 16px;
                    position: relative;

                    &:hover{
                        box-shadow: 0px 2px 8px -2px rgba(0,0,0,.15);
                        cursor: pointer;
                    }

                    &:hover > .optionstoggle{
                        opacity: 1;
                    }
                }

                .header{
                    position: absolute;
                    margin-top: -2px;
                    margin-left: -2px;
                    width: 246px;;
                    text-align: center;
                    padding: 4px;  
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }

                .contents{
                    margin-top: 5%;
                }

                .nameandstar{
                    display: flex;
                    align-items: center;
                }

                .dgname{
                    font-size: 16px;
                    font-weight: bold;
                    text-align: left;
                    color: #2e3748;
                    margin: 0px 8px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    overflow: hidden;
                }

                .dgdesc{
                    font-size: 12px;
                    text-align: left;
                    color: #6f8195;
                    margin: 0px 8px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    overflow: hidden;
                }

                .previewcontainer{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f1f6f9;
                    height: 128px;
                }

                .optionstoggle{
                    display: flex;
                    line-height: 15px;
                    justify-content: center;
                    position: absolute;
                    margin-top: 8px;
                    margin-left: 224px;
                    width: 24px;
                    height: 24px;
                    font-size: 16px;
                    font-weight: 900;
                    border: none;
                    outline: none;
                    background-color: #50565f;
                    border-radius: 4px;
                    color: #fbfdfd;
                    cursor: pointer;
                    opacity: 0;
                }

                .star{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: scale(.5);

                    svg{
                        path{
                            stroke-width: 2;
                            stroke: #6f8195;
                        }
                    }

                    svg{
                        &:hover > path{
                            stroke: #0373fc;
                            cursor: pointer;
                        }
                    }
                }

            `}</style>

        </div>
    );
}

export default DiagramPreview;