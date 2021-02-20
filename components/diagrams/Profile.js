import { useState, useEffect } from 'react';
import Image from 'next/image'
import ProfileModal from './ProfileModal';

const Profile = (props) => {
  // figure out props
    const [expand, showProfile] = useState(false);

    const profilemodal = expand ? <ProfileModal /> : '';

    return (
        <div className='profilemodal'>
          <div id='profile'>
            <Image 
            src="/../public/favicon.png"
            alt="Picture of the author"
            width={36}
            height={36}
            />
            <div id='profilename'>Put Profile Name here</div><button id='profilebtn' onClick={()=>showProfile(!expand)} >V</button>
            {profilemodal}
          </div>

            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');

                *{
                    font-family: 'Inter', sans-serif;
                }

                #profile {
                    display: flex;
                    width: 250px;
                    background-color: none;
                    z-index: 999999998;
                    box-shadow: 3px 0px 3px rgba(0,0,0,.05);
                    font-size: 12px;
                    text-align: center;
                }

                #profilename{
                  width: 50%;
                }
                #profilebtn{
                    font-size: 36px;
                    font-family: 'Inter', sans-serif;
                    padding: 4px 8px;
                    border-bottom-right-radius: 8px;
                    margin-top: 0;
                    color: #6f8195;
                    background-color: none;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    z-index: 9999999999;

                    &:hover{
                        color: #12b3ab;
                        background-color: #cad5e0;
                    }
                }

                // #header{
                //     position: relative;
                //     font-size: 24px;
                //     text-align: left;
                //     color: white;
                //     background-color: #12b3ab;
                //     padding: 16px;
                //     // border-bottom: 3px solid #b8c2cc;
                //     box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
                //     z-index: 10;
                //     height: 30px;
                // }

                // .tablename{
                //     position: relative;
                //     font-size: 16px;
                //     text-align: left;
                //     background-color: #f7fafc;
                //     padding: 16px;
                //     border-bottom: 1px solid #d9e1e7;
                //     box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
                //     z-index: 9;

                //     &:hover{
                //         cursor: pointer;
                //         background-color: #eaf4ff;
                //     }
                // }

                // #createbtn{

                //     background-color: transparent;
                //     border: 2px solid white;
                //     outline: none;
                //     color: white;
                //     border-radius: 8px;

                //     &:hover{
                //         border: 4px solid white;
                //         font-weight: 900;
                //         margin-left: -2px;
                //     }
                // }

            `}</style>

        </div>
    );
}

export default Profile;