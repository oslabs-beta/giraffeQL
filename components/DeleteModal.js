import { useState, useEffect } from 'react';

const DeleteModal = (props) => {

  return (
    <div id='deletemodal'>

      <div id='content'>
      Are you sure you want to delete this table, dummy?
      </div>

      <button onClick={()=> props.confirmRemoveElement(props.deleteNode)}>Yes</button>
      <button onClick={() => props.selectDelete(null)}>No</button>

    <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');

                *{
                    font-family: 'Inter', sans-serif;
                }

                #deletemodal{
                  display: flex;
                  flex-direction: column;
                  color: black;
                  justify-content: center;
                  align-items: center;
                  align-content: center;
                  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
                  border-radius: 8px;
                  width: 400px;
                  height: 400px; 
                  background-color: white;
                  left: 45%;
                  top: 40%;
                  position: absolute;
                  z-index: 999999999999999999;
                }

                #content{
                  display: flex;
                  flex-direction: column;
                  color: black;
                  justify-content: center;
                  align-items: center;
                  align-content: center;
                  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                  border: 1px solid #6f8195;
                  margin: 10px;
                  text-align: center;
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
                  width: 20%;
                  box-shadow: inset 0px -2px 0px darken(#12b3ab, 20%), 0px -1px 0px #12b3ab;
                  margin-bottom: 10px;
  
                }

                  button:hover{
                    box-shadow: inset 0px -1px 0px darken(#12b3ab, 20%);
                  }
                

            `}</style>
            </div>
  )
}

export default DeleteModal;