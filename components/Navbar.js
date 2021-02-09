import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'react-flow-renderer';

const Navbar = (props) => {

    const store = useStoreState((store) => store);

    const [searchquery, typeSearch] = useState('');
    const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);

    const submit = (e) => {
        if (e.code === 'Enter' && searchquery.length > 0) {
            e.target.blur();

            const target = store.elements.filter(node => !node.id.includes('reactflow')).findIndex(node => node.data.label.props.children.props.tablename === searchquery.toLowerCase());

            if (target !== -1)
                return (props.search(store.elements[target]), setSelectedElements(store.elements[target]), typeSearch(''));
            else return typeSearch('');
        }
    }

    return (
        <div id='navbar'>

            <Link href='/'>
                <h1>giraffeQL</h1>
            </Link>
            <h2>Codesmith NY 23</h2>

            <input value={searchquery} placeholder='Search for a table name . . .' onChange={(e)=>typeSearch(e.target.value)} onKeyDown={submit} />

            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');

                *{
                    font-family: 'Inter', sans-serif;
                    transition: all .3s;
                }

                h1 {
                    font-size: 16px;
                    color: #edf2f7;
                    border-radius: 8px;
                    padding: 8px;

                    &:hover{
                        background-color: #5f81e7;
                    }
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
                    height: 39px;
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