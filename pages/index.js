import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';

const Home = (props) => {

    const [URI, setURI] = useState('');

    return (
        <div id='home'>

          <div id='homemodal'>

            <div id='header'>Welcome to <span style={{color: 'white', fontWeight: '500'}}>giraffeQL</span> 🦒</div>
            
            <div id='homecontainer'>

              <svg viewBox="0 0 100 100">
                <g fill="transparent" stroke="#12b3ab" strokeWidth="8">
                  <circle cx="50" cy="50" r="42" fill="#edf2f7" />
                  <circle cx="25" cy="50" r="4" />
                  <circle cx="75" cy="50" r="4" />
                  <path d="M 25 65 C 35 85, 65 85, 75 65"/>
                </g>
              </svg>

              <h1>Logo goes here</h1>

              <h2>and a short tagline!</h2>

              <h3>Type a database URI below to get started:</h3>

              <div id='homesearch'>

                <input type='text' spellCheck='false' placeholder='Enter a valid PostgreSQL URI' val={URI} onChange={e => setURI(e.target.value)} />
                <Link href={{ pathname: '/canvas', query: { data: URI } }}><button disabled={URI.length < 1 ? true : false}><span>Enter</span></button></Link>

              </div>

            </div>

           </div>

          <style jsx>{`

          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;700;900&display=swap');


            *{
              font-family: 'Inter', sans-serif;
              transition: all .3s ease;
              font-weight: 300;
            }

            #home{
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              width: 100vw;
              height: 100vh;
              background-color: #edf2f7;
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

            #homemodal{
              display: flex;
              flex-direction: column;
              box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
              border-radius: 8px;
              width: 400px;
              height: 330px; 
              background-color: white;
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
              }

              input{

                border: 1px solid #6f8195;
                border-right: none;
                border-radius: 4px 0px 0px 4px;
                color: #6f8195;
                background-color: white;
                outline: none;
                font-size: 12px;
                padding: 8px 16px;
  
                &:focus{
                  border-right: none;
    
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
                border: 1px solid #12b3ab;
                border-radius: 0px 4px 4px 0px;
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

            #homesearch{
              display: flex;
            }

          `}</style>
            
        </div>
    );
}

export default Home;