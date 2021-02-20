import Link from 'next/link';

import Giraffe from '../../components/icons/Giraffe.js'
import Profile from '../../components/diagrams/Profile.js';

const DiagramNavbar = () => {

  return (
      <div id='navbar'>

          <Link href='/'>
              <div id='homebtn'>
                  <Giraffe /> 
                  <h1>giraffe<span style={{fontWeight: 'bold'}} >QL</span></h1>
              </div>
          </Link>
          <Profile />
          <style jsx>{`

              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;700;900&display=swap');

              *{
                  font-family: 'Inter', sans-serif;
                  font-weight: 300;
                  font-size: 16px;
                  transition: all .3s;
              }

              h1 {
                  color: #edf2f7;
                  border-radius: 8px;
                  padding: 8px;
              }

              h2 {
                  color: #b2b7ff;
                  margin: 0px 16px;
              }

              #homebtn{
                  display: flex;
                  
                  &:hover{
                      background-color: #5f81e7;
                      cursor: pointer;
                  }
              }

              #navbar {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  overflow: hidden;
                  background-color: #5661b3;
                  position: fixed;
                  top: 0;
                  width: 100%;
                  height: 39px;
                  padding: 8px;
                  z-index: 9999999999999999999999999;
              }

              input {
                  font-size: 12px;
                  color: black;
                  background-color: #727ed4;
                  border-radius: 32px;
                  height: 16px;
                  width: 250px;
                  padding: 8px;
                  margin: 16px;
                  border: none;
                  outline: none;
                  box-shadow: inset 2px 2px 0px #262f6e;

                  &:focus{
                      background-color: #b2b7ff;
                  }

                  ::placeholder{
                      color: #b2b7ff;
                  }
              }

          `}</style>

      </div>
   );
}
 
export default DiagramNavbar;