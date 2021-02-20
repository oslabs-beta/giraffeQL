import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link';

const ProfileModal = (props) => {
  // need to add functionality to user settings link and signout link
    return (
        <div className='profilemodal'>
          
            <span id='profilesettings'>User Settings</span>
            <span id='signout'>Sign Out</span>
          

            <style jsx>{`

              *{
                font-family: 'Inter', sans-serif;
              }

              .profilemodal{
                display: flex;
                flex-direction: column;
                position: fixed;
                padding: 0px 4px;
                width: 150px;
                height: 200px;
                border-radius: 4px;
                background-color: white;
                margin: 16px;
                margin-left: 48px;
                margin-top: 54px;
            }

            span{
              margin: 20px;
              border-bottom: 3px solid #b8c2cc;

              &:hover{
                background-color: lighten(#b8c2cc, 10%);
              }
            }

            `}</style>

        </div>
      );
}

export default ProfileModal;