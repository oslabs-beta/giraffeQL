import { useState, useEffect } from 'react';

const DeleteModal = (props) => {

  const [warningCheck, checkWarning] = useState(false);

  useEffect(() => {
    changeWarningPreference();
  }, [warningCheck]);

  const changeWarningPreference = () => {
    props.toggleWarning(!warningCheck);
  }

  return (
    <div id='deletemodal'>

      <div id='warningheader'>Notice:</div>

      <svg viewBox="0 0 100 100">
        <g fill="transparent" stroke="#f54c4c" strokeWidth="12">
          <circle cx="50" cy="50" r="42" fill="#bac3cc" />
          <rect x="20" y="30" width="60" height="40" rx="5" stroke="white" fill="white" strokeWidth="5" />
          <rect x="20" y="30" width="60" height="10" rx="5" stroke="#4361ee" fill="#4361ee" strokeWidth="5" />
          <path d="M 20 80 C 50 50, 50 50, 80 20" strokeWidth="16"/>
        </g>
      </svg>

      <div id='warningmsg'>Are you sure you want to delete this table?</div>
      <div id='warningsubtitle'>(Action cannot be undone)</div>

      <label>
        Do not show this message again.
        <input type="checkbox" checked={warningCheck} onChange={() => checkWarning(!warningCheck)}/>
      </label>

      <div id='deletebtns'>
        <button id='confirmdeletebtn' onClick={()=> props.confirmRemoveElement(props.deleteNode)}><span>Yes, delete it.</span></button>
        <button onClick={() => props.selectDelete(null)}><span>No, take me back!</span></button>
      </div>

      <style jsx>{`

        *{
          font-family: 'Inter', sans-serif;
        }

        #deletemodal{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 10px -1px rgba(0,0,0,0.1), 0 4px 6px -1px rgba(0,0,0,0.06);
          border-radius: 8px;
          width: 400px;
          height: 300px; 
          background-color: white;
          position: fixed;
          top: 25%;
          left: 35%;  
          z-index: 999999999999999999;
          animation: slideInFromLeft .5s ease-in-out;
        }

        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-300%);
          }
          100% {
            transform: translateX(0);
          }
        }

        #warningheader{
          width:  100%;
          height: 48px;
          margin-top: -32px;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          line-height: 2em;
          background-color: #f54c4c;
          border-radius: 8px 8px 0px 0px;
        }
        
        svg{
          margin-top: 8px;
          top: 0;
          width: 100px;
          height: 100px;
        }

        #warningmsg{
          color: black;
          margin: 8px;
          margin-bottom: 0;
          text-align: center;
        }

        #warningsubtitle{
          text-align: center;
          margin: 0;
          margin-bottom: 24px;
          color: #6f8195;
        }

        label{
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 300;
          color: #6f8195;
        }

        input{
          width: 12px;
          height: 12px;
        }

        #deletebtns{
          display: flex;
          align-items: center;
          justify-content: center;
        }

        button{
          padding: 8px 32px;
          border: none;
          outline: none;
          color: white;
          background-color: #12b3ab;
          box-shadow: inset 0px -2px 0px darken(#12b3ab, 20%), 0px -1px 0px #12b3ab;
          margin: 8px;

          span{
            position: relative;
            top: -1px;
          }

          &:hover{
            box-shadow: inset 0px -1px 0px darken(#12b3ab, 20%);
          }

          &:hover > span{
            top: 0px;
          }

        }

        #confirmdeletebtn{
          background-color: #f54c4c;
          box-shadow: inset 0px -2px 0px darken(#f54c4c, 30%), 0px -1px 0px #f54c4c;

          &:hover{
            box-shadow: inset 0px -1px 0px darken(#f54c4c, 30%);
          }
        }
                  

      `}</style>

    </div>
  )
}

export default DeleteModal;