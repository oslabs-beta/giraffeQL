import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image'

import GitHub from '../icons/GitHub.js';

const LoginModal = (props) => {

    const router = useRouter();
    
    return (    
        <div id='homemodal'>

            <div id='header'> Welcome to giraffeQL</div>

            <div id='imgcontainer'><Image src={'/getstarted.svg'} width={320} height={320} /></div>

            <div id='homecontainer'>

                <div id='btncontainer'>
                    <Link href={process.env.NODE_ENV === 'development' ? `http://localhost:3001/auth/github` : `https://giraffeql-api.herokuapp.com/auth/github`}>
                    <button><span>Sign in With GitHub<GitHub /></span></button>
                    </Link>

                    <h1> - or - </h1>

                    <button onClick={() => router.push('diagrams', 'diagrams', {shallow: true})} ><span>Continue as a Guest <div style={{margin: '2px'}} /> <Image src={'/checkmark.svg'} width={16} height={16} /> </span></button>
                </div>

            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;700;900&display=swap');

                *{
                    font-family: 'Inter', sans-serif;
                    transition: all .3s ease;
                    font-weight: 300;
                }

                #homemodal{
                    position: fixed;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06), 0px 0px 16px 0px rgba(0,0,0,.1);
                    border-radius: 8px;
                    width: 400px;
                    height: 300px; 
                    background-color: white;
                    z-index: 10000000000000000000000000000000000000000000000;
                    margin-top: 15%;
                    margin-left: 37%;

                    animation: slideInTop .5s ease-in-out;
                }

                @keyframes slideInTop {
                    100% {
                        transform: translateY(0%);
                    }
                    0% {
                        transform: translateY(300%);
                    }
                }

                #header{
                    width:  100%;
                    height: 48px;
                    margin-top: -32px;
                    text-align: center;
                    font-size: 24px;
                    line-height: 2em;
                    background-color: #5661b3;
                    color: #b2b7ff;
                    border-radius: 8px 8px 0px 0px;
                }

                #imgcontainer{
                    position: fixed;
                    margin-left: 42px;
                    margin-top: -86px;
                }

                #btncontainer{
                    margin-top: 72px;
                }

                #homecontainer{
                    display: flex;
                    align-items: center;
                    margin-top: 16px;
                    justify-content: center;
                    flex-direction: column;

                    svg{
                        margin: 0;
                        top: 0;
                        width: 150px;
                        height: 150px;
                    }

                    h1{
                        font-size: 24px;  
                        font-weight: 700;
                        color: #2d3748;
                        text-align: center;
                        margin: 0;
                    }

                    h2{
                        font-size: 16px;
                        font-weight: 500;
                        color: #434190;
                        text-align: center;
                        margin: 0;
                        margin-bottom: 16px;
                    }

                    h3{
                        font-size: 12px;
                        font-weight: 700;
                        color: #2d3748;
                        text-align: center;
                        margin: 4px;
                        // margin-top: 16px;
                    }
        

                    button{
                        transition: 0s;
                        position: relative;
                        border: none;
                        height: 48px;
                        width: 192px;
                        color: white;
                        background-color: #12b3ab;
                        padding: 8px;
                        margin: 16px;
                        outline: none;
                        box-shadow: inset 0px -2px 0px darken(#12b3ab, 20%), 0px -1px 0px #12b3ab;

                        span {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: 0s;
                            font-size: 12px;
                            font-weight: 500;
                            position: relative;
                            top: -1px;
                        }

                        &:focus{
                            outline: none;
                        }

                        &:hover{
                            box-shadow: inset 0px -1px 0px darken(#12b3ab, 20%);
                        }

                        &:hover > span{
                            top: 0px;
                        }

                        &:disabled{
                            transition: all .3s;
                            border: 1px solid #6f8195;
                            color: #6f8195;
                            background-color: #d9e1e7;
                            box-shadow: none;
                        }

                        &:disabled > span{
                            transition: all .3s;
                            top: 0px;
                        }
                    }
                }

            `}</style>
                
        </div>);
}

export default LoginModal;