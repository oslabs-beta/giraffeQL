import { useState, useEffect } from 'react';
import Image from 'next/image'
import ProfileOptions from './ProfileOptions';

import Carot from  '../../components/icons/Carot.js'

const Profile = (props) => {

  const [username, setUsername] = useState('Anonymous');
  const [image, setImage] = useState('/../public/tempuser.png');

  const [expand, toggleOptions] = useState(false);

  return (
    <div>

      <div id='usercontainer' onClick={()=>toggleOptions(!expand)}>

        <div id='imagecontainer'>
          <Image 
          src={image}
          width={36}
          height={36}
          />
        </div>

        <h1>{username}</h1>
        <Carot />

      </div>
      
      <ProfileOptions expand={expand} />

      <style jsx>{`

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');

        *{
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 500;
        }

        #usercontainer{

          display: flex;
          align-items: center;
          width: 224px;
          
          &:hover{
            background-color: #5f81e7;
            cursor: pointer;
          }
        }

        #imagecontainer {
          width: 36px;
          height: 36px;
          margin: 16px;
          background-color: #c5c5c5;
          border-radius: 50%;
        }

        h1{
          color: white;
          margin-right: 8px;
        }

      `}</style>

    </div>
  );
}

export default Profile;