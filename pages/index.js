import Head from 'next/head';
import Link from 'next/link';

import { useEffect, useContext } from 'react';
import { UserContext } from '../context/state.js';

import getUser from '../controller/getUser.js';

import Navbar from '../components/Navbar.js';
import GiraffeQL from '../components/icons/GiraffeQL.js';
import GitHub from '../components/icons/GitHub.js';

import { parseCookies } from 'nookies';

const Home = (props) => {

    const { storeUser, logout } = useContext(UserContext);

    useEffect(() => {
      if (props.user) storeUser(props.user)
      else logout();
    }, []);

    return (
        <div id='home'>

          <Navbar />

          <Head>
            <title>giraffeQL</title>
            <link rel="shortcut icon" href="/favicon.png" />
          </Head>

          <div id='homemodal'>

            <div id='header'>Welcome to giraffeQL</div>
            
            <div id='homecontainer'>

              <GiraffeQL />

              <Link href={process.env.NODE_ENV === 'development' ? `http://localhost:3001/auth/github` : `https://giraffeql-api.herokuapp.com/auth/github`}>
                <button><span>Sign in With GitHub<GitHub /></span></button>
              </Link>

              <h3> - or - </h3>

              <Link href='diagrams'>
                <button><span>Continue as a Guest</span></button>
              </Link>
              
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
              box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06), 0px 0px 16px 0px rgba(0,0,0,.1);
              border-radius: 8px;
              width: 400px;
              height: 375px; 
              background-color: white;
              z-index: 10;
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
              
              #postgres{
                margin-top: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                border-radius: 4px 0px 0px 4px;
                padding: 8px;
                outline: none;
                font-size: 12px;
                border: 1px solid #6f8195;
                border-right: none;
                color: #6f8195;
                background-color: #d9e1e7;
                box-shadow: none;
              }

              input{

                border: 1px solid #6f8195;
                border-right: none;
                // border-radius: 4px 0px 0px 4px;
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

              #databaselist{
                padding: 0;
                margin: 0;
                border: none;
                outline: none;
                background-color: transparent;
                width: 96px;
                color: #6f8195;

                ::placeholder{
                  color: #6f8195;
                }
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

            #homesearch{
              display: flex;
              height: 32px;
            }

            #loading{
              position: fixed;
              font-size: 16px;  
              font-weight: 700;
              color: #2d3748;
              text-align: left;
              margin: 0;
              bottom: 0;
              left: 0;
              margin-left: 32px;
            }

          `}</style>
            
        </div>

    );
}

export async function getServerSideProps (ctx) {
  const { authorization } = parseCookies(ctx);
  const { token } = ctx.query
  const props = await getUser(authorization || token);
  return {props};
}

export default Home;

