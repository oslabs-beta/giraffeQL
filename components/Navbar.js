const Navbar = (props) => {

    return (
        <div id='navbar'>

            <h1>GraphitiQL</h1>
            <h2>Codesmith NY 23</h2>

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

            `}</style>

        </div>
    );

}

export default Navbar;