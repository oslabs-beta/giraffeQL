import Link from 'next/link'
import { useState, useEffect } from 'react'

const Home = (props) => {

    const [URI, setURI] = useState('');

    return (
        <div id='home'>
            <input type='text' placeholder='uri here' val={URI} onChange={e => setURI(e.target.value)} />
            <Link href={{ pathname: '/canvas', query: { data: URI } }}>
                <button disabled={URI.length < 1 ? true : false}>Click to go to node canvas</button>
            </Link>

            <style jsx>{`

                #home{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

            `}</style>
        </div>
    );
}

export default Home;