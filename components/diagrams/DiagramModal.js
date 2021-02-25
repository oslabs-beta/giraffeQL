import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DiagramModal = (props) => {

  const router = useRouter();

  useEffect(() => {
    props.setURI('');
  }, []);

  useEffect(() => {

    const submitURI = (e) => {
      if (e.code === 'Enter' && URI.length > 0)
        return props.checkURLStatus();
    }

    document.addEventListener('keydown', submitURI);

    return () => {
      document.removeEventListener('keydown', submitURI);
    };

  });

  const instructions = props.message === 'error' ? 'Invalid URI, please try again:' : 'Type a database URI below to get started:';

  useEffect(() => {
    const handleStart = () => { props.setPageLoading(true); };
    const handleComplete = () => { props.setPageLoading(false); };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <div id='diagrammodal'>

      <div id='header'>Connect to a database</div>
      
      <div id='diagramcontainer'>

        <h3>Enter a name:</h3>
        <input type='text' placeholder={`Name your new diagram!`} val={props.name} onChange={e => props.setName(e.target.value)} maxLength="20" />

        <h3>(Optional) Enter a description:</h3>
        <input type='text' placeholder={`What's your database for?`} val={props.description} onChange={e => props.setDescription(e.target.value)} maxLength="40" />

        <h3 style={{color: '#f54c4c'}} >{props.error == 'access_denied' ? 'Could not verify user, continue as a guest.' : ''}</h3>
        <h3 style={{color: `${props.message === 'error' ? '#f54c4c' : '#2d3748'}`}} >{instructions}</h3>

        <div id='diagramsearch'>
        
            <div id='postgres'><input id='databaselist' type='text' list='databases' placeholder='postgres://' /><datalist id='databases' ><option value='postgres://' /></datalist></div>
            <input id='uri' spellCheck='false' type='text' placeholder='Enter a valid PostgreSQL URI' val={props.URI} onChange={e => props.setURI(e.target.value)} />
            <button onClick={props.checkURLStatus} disabled={props.URI.length < 1 || props.name.length < 1 ? true : false}><span>Enter</span></button>

        </div>

        <h3> - or - </h3>

        <button id='newprojectbtn' onClick={props.newProject} disabled={props.name.length < 1 ? true : false} ><span>New Project</span></button>
      
      </div>

      <style jsx>{`

      *{
        font-weight: 300;
      }

      #diagrammodal{
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        border-radius: 8px;
        width: 30%;
        height: 40%; 
        background-color: white;
        z-index: 10;
        position: fixed;
        animation: slideOutTop .5s ease-in-out;
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

      @keyframes slideOutTop {
        100% {
            transform: translateY(0%);
        }
        0% {
            transform: translateY(-300%);
        }
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

        input{

          border: 1px solid #6f8195;
          border-radius: 4px;
          color: #6f8195;
          width: 50%;
          background-color: white;
          outline: none;
          font-size: 12px;
          padding: 8px 16px;

          &:focus{
            ::placeholder{
              color: #6f8195;
            }
          }
        
          ::placeholder{
            color: #cccccc;
          }

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

        #uri{

          border: 1px solid #6f8195;
          border-right: none;
          border-radius: 0px;
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
      }

      #diagramsearch{
        display: flex;
        height: 32px;
      }

      `}</style>
        
    </div>
  );
}

export default DiagramModal;