import { useState, useEffect } from 'react';

const Navbar = (props) => {

    const [searchquery, typeSearch] = useState('');

    useEffect(() => {

        const onKeyDown = ({key}) => {
            if (key === "Enter" && searchquery.length > 0)
                return (props.search(searchquery.toLowerCase()), typeSearch(''));
        }

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }

    });

    return (
        <div id='navbar'>

            <h1>GraphitiQL</h1>
            <h2>Codesmith NY 23</h2>

            <input value={searchquery} placeholder='Search for a table name . . .' onChange={(e)=>typeSearch(e.target.value)} />

            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');

                *{
                    font-family: 'Inter', sans-serif;
                    transition: all .3s;
                }

                h1 {
                    font-size: 16px;
                    color: #edf2f7;
                }

                h2 {
                    font-size: 12px;
                    color: #b2b7ff;
                    margin: 0px 16px;
                }

                #navbar {
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    background-color: #5661b3;
                    position: fixed;
                    top: 0;
                    width: 100%;
                    padding: 8px;
                    z-index: 9999999999999999999999999;
                }

                input {
                    color: black;
                    background-color: #727ed4;
                    border-radius: 32px;
                    height: 16px;
                    padding: 8px;
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

export default Navbar;