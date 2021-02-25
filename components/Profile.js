import Image from 'next/image'

import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/state.js';

import ProfileOptions from './ProfileOptions';

import Carot from  './icons/Carot.js'

const Profile = (props) => {

  const { user, storeUser } = useContext(UserContext);
  const [username, setUsername] = useState('Anonymous');
  const [image, setImage] = useState('/tempuser.png');

  const [loggedIn, toggleLoginStatus] = useState(false);

  const [expand, toggleOptions] = useState(false);

  useEffect(() => {

    if (!Object.keys(user).length) {
      setUsername('Anonymous');
      setImage('/tempuser.png');
      toggleLoginStatus(false);
      return;
    }
    
    if (!user.hasOwnProperty('displayName') || !user.hasOwnProperty('photos'))
      return;

    if (user.displayName.length > 0) {
      setUsername(user.displayName.split(' ')[0]);
    } else {
      setUsername(user.username);
    }
    
    setImage(user.photos[0].value);
    toggleLoginStatus(true);

  }, [user])

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
      
      <ProfileOptions expand={expand} loggedIn={loggedIn} />

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
          clip-path: circle(18px at center);
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