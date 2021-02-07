import Link from 'next/link'
import { useState, useEffect } from 'react'

import Navbar from '../components/Navbar.js';

const Home = (props) => {

    const [URI, setURI] = useState('');

    return (
        <div id='home'>

            <div id='homecontainer'>

                <input type='text' placeholder='uri here' val={URI} onChange={e => setURI(e.target.value)} />
                <Link href={{ pathname: '/canvas', query: { data: URI } }}>
                    <button disabled={URI.length < 1 ? true : false}>Click to go to node canvas</button>
                </Link>

            </div>

            <style jsx>{`

                #home{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    width: 100vw;
                    height: 100vh;
                }

                #homecontainer{
                    display: flex;
                    margin-top: 55px;
                }

            `}</style>
            
        </div>
    );
}

export default Home;