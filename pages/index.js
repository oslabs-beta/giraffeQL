import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';

const Home = (props) => {

    const [URI, setURI] = useState('');

    return (
        <div id='home'>

            <div id='homecontainer'>
              <div id='header'>Welcome to GirapheQL</div>
              <div id='input'>
                <input type='text' spellCheck='false' placeholder='uri here' val={URI} onChange={e => setURI(e.target.value)} />
                <Link href={{ pathname: '/canvas', query: { data: URI } }}>
                    <button disabled={URI.length < 1 ? true : false}>Submit</button>
                </Link>
              </div>
           </div>
           {/* <div>{}</div> */}
            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');

                #home{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    width: 100vw;
                    height: 100vh;
                    font-size: 66px;
                }

                #homecontainer{
                    font-family: 'Inter', sans-serif;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    justify-content: center;
                    border: 1px solid #d9e1e7;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
                    border-radius: 8px;
                    margin-top: 55px;
                    width: 23%;
                    height: 33%; 
                    background-color: white;
                }

                #input{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: -3.5em;
                  width: 100%;
                }
                
                    button{
                      margin-left: 12px;
                      width: 20%;
                      color: #12b3ab;
                      position: relative;
                      border: 1px solid #12b3ab;
                      border-radius: 4px;
                      padding: 8px;
                      outline: none;

                      &:focus{
                        outline: none;
                      }

                      &:hover{
                        color: #12b3ab;
                        background-color: #cad5e0;
                      }
                    }

                    #header{
                      width:  100%;
                      height: 2em;
                      font-size: .9em;
                      margin-top: -3.4em;
                      text-align: center;
                      vertical-align: center;
                      background-color: #5661b3;
                      color: #b2b7ff;
                      line-height: 2em;
                      border-radius: 8px 8px 0px 0px;
                    }

                    input{
                      width: 50%;
                      padding-top: .75em;
                      // height: 3.2em;
                      line-height: 3.2em;
                      vertical-align: center;
                      border: 1px solid #d9e1e7;
                      border-radius: 8px;
                      color: #6f8195;
                      background-color: transparent;
                      outline: none;
                      font-family: 'Inter', sans-serif;
                    
                      ::placeholder{
                        font-family: 'Inter', sans-serif;
                        font-size: 2.5em;
                        color: #cccccc;
                        vertical-align: center;
                        height: 3.2em;
                        line-height: 3.2em;
                        }
                  }

                  input:focus{
                    border: 1px solid #6f8195;

                    ::placeholder{
                      font-family: 'Inter', sans-serif;
                      font-size: 2.5em;
                      color: #6f8195;
                  }
                }

            `}</style>
            
        </div>
    );
}

export default Home;