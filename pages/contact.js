import Head from 'next/head';

import { useState, useEffect } from 'react';

import Header from '../components/icons/Header.js';
import Navbar from '../components/Navbar.js';

const Contact = (props) => {

    const [contactMessage, writeMessage] = useState('');

    return (
        <div id='contact'>

            <Head>
                <title>giraffeQL</title>
                <link rel="shortcut icon" href="/favicon.png" />
            </Head>

            <Header />
            <Navbar />

            <div id='contactmodal'>

                <div id='header' data-testid='header'>Contact us</div>
                
                <div id='contactcontainer'>

                    <input type='text' val={contactMessage} onChange={(e)=>writeMessage(e.target.value)} />

                    <button id='submitbtn'><span>Submit</span></button>
                    
                </div>

            </div>

            <style jsx>{`

                *{
                    font-family: 'Inter', sans-serif;
                    transition: all .3s ease;
                    font-weight: 300;
                }
        
                #contact{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    width: 100vw;
                    height: 100vh;
                    background-color: #edf2f7;
                }

                #contactmodal{
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
                    border-radius: 8px;
                    width: 400px;
                    height: 180px; 
                    background-color: white;
                    z-index: 10;
                    position: fixed;
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

                #contactcontainer{
                    display: flex;
                    align-items: center;
                    margin-top: 16px;
                    justify-content: flex-start;
                    flex-direction: column;
                    height: 100%;

                    h3{
                        font-size: 12px;
                        font-weight: 700;
                        color: #2d3748;
                        text-align: center;
                        margin: 4px;
                    }
                    
                    input{
            
                        border: 1px solid #6f8195;
                        color: #6f8195;
                        background-color: white;
                        outline: none;
                        font-size: 12px;
                        width: 60%;
                        height: 50%;
            
                        &:focus{            
                            ::placeholder{
                                color: #6f8195;
                            }
                        }
                    
                        ::placeholder{
                            color: #cccccc;
                        }
            
                    }
            
                    button{
                        transition: 0s;
                        position: relative;
                        border: none;
                        color: white;
                        background-color: #12b3ab;
                        padding: 8px;
                        outline: none;
                        box-shadow: inset 0px -2px 0px darken(#12b3ab, 20%), 0px -1px 0px #12b3ab;
            
                        span {
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

        </div>
    );
}

export default Contact;