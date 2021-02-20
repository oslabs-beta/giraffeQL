import Link from 'next/link';

import Profile from '../../components/diagrams/Profile.js';
import Giraffe from '../../components/icons/Giraffe.js'

const DiagramNavbar = () => {

  return (
    <div className='navbar'>

      <Link href='/'>
          <div className='homebtn'>
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

          .navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;
            // background-color: #5661b3;
            position: fixed;
            top: 0;
            width: 100%;
            height: 39px;
            padding: 8px;
            z-index: 9999999999999999999999999;
          }

          h1 {
            color: #edf2f7;
            border-radius: 8px;
            padding: 8px;
          }

          h2 {
            color: #b2b7ff;
            font-weight: 500;
            font-size: 24px;
          }

          .homebtn{
            display: flex;
            
            &:hover{
              background-color: #5f81e7;
              cursor: pointer;
            }
          }

      `}</style>

    </div>
  );
}
 
export default DiagramNavbar;