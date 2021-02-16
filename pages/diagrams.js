import Head from 'next/head';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import Header from '../components/icons/Header.js';
import GiraffeQL from '../components/icons/GiraffeQL.js';

const Diagrams = (props) => {

    const [URI, setURI] = useState('');
    const [pageLoading, setPageLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
      setURI('');
    }, []);

    useEffect(() => {

      const submitURI = (e) => {
        if (e.code === 'Enter' && URI.length > 0)
          return checkURLStatus();
      }

      document.addEventListener('keydown', submitURI);

      return () => {
       document.removeEventListener('keydown', submitURI);
      };

    });

    const checkURLStatus = () => {

      let path = '';

      if (!URI.includes('postgres://')) path = 'postgres://' + URI;
      else path = URI;

      const href = { pathname: '/canvas', query: { data: [path] } }

      router.push(href)
    }

    const instructions = props.message === 'error' ? 'Invalid URI, please try again:' : 'Type a database URI below to get started:';

    useEffect(() => {
      const handleStart = () => { setPageLoading(true); };
      const handleComplete = () => { setPageLoading(false); };
      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);
      }, [router]);

    return (
        <div id='diagram'>

          <Head>
            <title>giraffeQL</title>
            <link rel="shortcut icon" href="/favicon.png" />
          </Head>

          <Header />

          <div id='diagrammodal'>

            <div id='header'>Connect to a database</div>
            
            <div id='diagramcontainer'>

              <GiraffeQL />

              <h3 style={{color: `${props.message === 'error' ? '#f54c4c' : '#2d3748'}`}} >{instructions}</h3>

              <div id='diagramsearch'>
              
                <div id='postgres'><input id='databaselist' type='text' list='databases' placeholder='postgres://' /><datalist id='databases' ><option value='postgres://' /></datalist></div>
                <input type='text' spellCheck='false' placeholder='Enter a valid PostgreSQL URI' val={URI} onChange={e => setURI(e.target.value)} />
                <button onClick={checkURLStatus} disabled={URI.length < 1 ? true : false}><span>Enter</span></button>

              </div>

              <br/>

              <h3> - or - </h3>

              <br/>

              <Link href='canvas'>
                <button id='newprojectbtn'><span>New Project</span></button>
              </Link>
              
            </div>
            
           </div>
           { pageLoading ? (<div id='loading'>Searching for your database...
           <div>
             <Image
                src='/searchGiraffe.jpeg' 
                width='150' 
                height='150'
                rel='prefetch'
             />
           </div>
           </div>) : <div/>}
          <style jsx>{`

            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;700;900&display=swap');

            *{
              font-family: 'Inter', sans-serif;
              transition: all .3s ease;
              font-weight: 300;
            }

            #diagram{
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

            #diagrammodal{
              display: flex;
              flex-direction: column;
              box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
              border-radius: 8px;
              width: 400px;
              height: 375px; 
              background-color: white;
              z-index: 10;
            }

            #diagramcontainer{
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

            #newprojectbtn{
              border: none !important;
              border-radius: 0 !important;
              // background-color: #9b5de5 !important;
              // box-shadow: inset 0px -2px 0px darken(#9b5de5, 20%), 0px -1px 0px #9b5de5 !important;

              &:hover{
                // box-shadow: inset 0px -1px 0px darken(#9b5de5, 20%) !important;
              }
            }

            #diagramsearch{
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

export default Diagrams;

export async function getServerSideProps({ query }) {

  if (!query.message)
    return {
      props: {}
    }

  const message = query.message;

  return {
    props: {message},
  }
}