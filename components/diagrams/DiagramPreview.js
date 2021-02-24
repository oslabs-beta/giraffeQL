import Image from 'next/image'

import { useState } from 'react';

import moment from 'moment';

const DiagramPreview = (props) => {

    const [image, setImage] = useState('/logo.svg');
    const [favorite, setFavorite] = useState(props.favorite);

    const colors=['#ff6b6b', '#f9844aff', '#fee440', '#02c39a', '#4361ee', '#9b5de5', '#f15bb5'];

    const toggleFavorite = () => {
        const fetchURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://giraffeql-api.herokuapp.com';
        fetch(`${fetchURL}/diagrams/favorite/${props.id}`, {method: 'PUT'})
            .then(res => res.json())
            .then(data => setFavorite(data.diagram.favorite));
    }

    const date = moment(props.updated).calendar();

    return (
        <div className='diagram'>

            <div className='diagramname' style={{backgroundColor: `${colors[props.index % colors.length]}`}} ></div>

            <div className='previewcontainer'>
                <Image 
                src={image}
                width={64}
                height={64}
                />
            </div>

            <div className='nameandstar' >
                <div className='dgname'>{props.name}</div>

                <div className='star' onClick={toggleFavorite} >
                    <svg width={24} height={24} viewBox="0 0 24 24" ><path fill={`${favorite ? '#0373fc' : 'transparent' }`} d="M12 .587l3.668 7.568L24 9.306l-6.064 5.828 1.48 8.279L12 19.446l-7.417 3.967 1.481-8.279L0 9.306l8.332-1.151z" /></svg>
                </div>
            </div>

            <div className='dgdesc'>{props.description}<br/><span style={{color: '#a1afbf'}}>Last updated {date}</span></div>

            <div className='diagrambtns'>
                <button onClick={() => props.selectDiagram(props.id)} style={{borderBottomLeftRadius: '8px'}} >✓</button>
                <button onClick={() => props.deleteDiagram(props.id)} style={{borderBottomRightRadius: '8px'}} >...</button>
            </div>

            <style jsx>{`

                *{
                    transition: all .2s;
                }

                .diagram{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    width: 250px;
                    height: 200px;
                    // background-color: #FAFAFA;
                    background-color: white;
                    border-radius: 8px;
                    border: 2px solid #edf2f7;
                    margin: 16px;
                    // filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.15));

                    &:hover{
                        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));
                    }
                }

                .diagramname{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    font-size: 16px;
                    font-weight: 700;
                    top: -1%;
                    left: -1%;
                    right: -1%;
                    text-align: center;
                    padding: 4px;  
                    color: black;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    // box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);
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
                }

                .dgdesc{
                    font-size: 9px;
                    text-align: left;
                    color: #6f8195;
                    margin: 0px 8px;
                }

                .previewcontainer{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f1f6f9;
                    height: 128px;
                }

                .diagrambtns{
                    display: flex;
                }

                button{
                    display: flex;
                    justify-content: center;
                    padding: 8px;
                    width: 100%;
                    outline: none;
                    border: none;
                    background-color: white;
                    flex-flow: row nowrap;

                    &:hover{
                        background-color: #0373fc;
                        cursor: pointer;
                    }

                    &:active{
                        background-color: #eaf4ff;
                    }
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
// hi benji\ suppppppp B-) 
export default DiagramPreview;