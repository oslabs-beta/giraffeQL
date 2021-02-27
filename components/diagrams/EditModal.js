import { useState } from 'react';

const EditModal = (props) => {


    return (
        <div id='editmodal'>

        <div id='header'>Edit Diagram</div>
        
        <div id='editcontainer'>

            <button id='submitbtn'><span>Done</span></button>
        
        </div>

        <style jsx>{`

        *{
            font-weight: 300;
        }

        #editmodal{
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
            border-radius: 8px;
            width: 30%;
            height: 18%; 
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

        #editcontainer{
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

        #submitbtn{
            border: none !important;
            border-radius: 0 !important;
        }

        `}</style>
            
    </div>
  );
}

export default EditModal;