import Head from 'next/head';
import Image from 'next/image'
import { useRouter } from 'next/router';

import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/state.js';

import getUser from '../controller/getUser.js';

import Navbar from '../components/Navbar.js';
import LoginModal from '../components/index/LoginModal.js';

import { parseCookies } from 'nookies';

const Home = (props) => {

  const router = useRouter();

  const { user, storeUser, logout } = useContext(UserContext);

  const [loginStatus, toggleLogin] = useState(false);
  const [showModal, toggleModal] = useState(false);

  useEffect(() => {
    if (props.user.authorization === null) return logout();
    toggleLogin(true);
    if (props.user.user.username === user.username) return;
    if (props.hasOwnProperty('user')) storeUser(props.user.user);
    else logout();
  }, []);

  const [scrollTop, setScrollTop] = useState(0);
  const [scrollOpacity, setOpacity] = useState(1);
  const [logoOpacity, setLogoOpacity] = useState(1);

  const [s1, triggers1] = useState(false);
  const [s2, triggers2] = useState(false);
  const [s3, triggers3] = useState(false);
  const [s4, triggers4] = useState(false);

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
      setOpacity(1 - (scrollTop/300));
      setLogoOpacity(1 - (scrollTop/400));
    };
    window.addEventListener("scroll", onScroll);

    if (scrollTop > 300)
      triggers1(true);

    if (scrollTop > 800)
      triggers2(true);

    if (scrollTop > 1400)
      triggers3(true);

    if (scrollTop > 1800)
      triggers4(true);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  const loginModal = showModal ? <LoginModal /> : '';

  return (
    <div id='home'>

      {<Navbar />}

      <Head>
        <title>giraffeQL</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      {/*<div id='scroll' className={` ${s1 ? 'scrollfade' : ''}`} >hint: scroll down for more</div>*/}

      {loginModal}
      
      <div id='preventClick' onClick={() => toggleModal(false)} style={{width: '100vw', height: '100vh', position: 'fixed', zIndex: `${showModal ? '50' : '-10'}`, backgroundColor: `${showModal ? 'rgba(0,0,0,.25)' : 'transparent'}`}} />

      <div id='blur' style={{filter: `${showModal ? 'blur(5px)' : ''}`}}>
      
        <section id='header'>
          <div className='inner'>
            <div style={{opacity: logoOpacity}}>
              <div id='logo'>
                {/*<GiraffeQL />*/}
                <Image src={'/frontpage.svg'} width={640} height={640} />
                {/*<h1>giraffe<span>QL</span></h1> <Image src={'/readme-logo.svg'} width={128} height={128} />*/}
              </div>
              {/*<p>easy graphQL code from your database</p>*/}

              <div id='btncontainer'>
                <button id='mainbtn' onClick={loginStatus ? () => router.push('diagrams', 'diagrams', {shallow: true}) : () => toggleModal(true)} >Get Started</button>
                <div id='line'/>
              </div>

            </div>
          </div>
        </section>

        <section id='one' className='box'>
          <div className={`content ${s1 ? 'fade' : ''}`} >

            <div className='text'>
              <h2>Use giraffe<span style={{color: '#6d6ea8'}}>QL</span> to make schemas.</h2>
              <h2><span>Zero</span> coding required.</h2>
              <h3>Easily create Apollo GraphQL schemas from your existing relational database. Use our visual UI to make changes and generate accurate code.</h3>
              <h3>Whenever you're done, export the code as a Javascript file and import it into your project, ready-to-go!</h3>
            </div>

            <div className='images'>
              <Image src={'/frontpage/editnode.gif'} width={900} height={475} />
            </div>

          </div>
        </section>

        <section id='two' className='diagonal-box'>
          <div className={`content ${s2 ? 'fade' : ''}`} >

            <div className='images' style={{marginLeft: '5%'}} >
              <Image src={'/frontpage/import.gif'} width={1448} height={795} />
            </div>

            <div className='text'>
              <h2>We automatically extract tables and relationships from your database.</h2>
              <h3>Get started right away by importing from an existing PostgreSQL URI with one click.</h3>
              <h3>Fill in our Resolver templates with your preferred database queries.</h3>
            </div>

          </div>
        </section>

        <section id='three' className='box'>
          <div className={`content ${s3 ? 'fade' : ''}`} >

            <div className='text'>
              <h2>Why GraphQL?</h2>
              <h3>GraphQL has been replacing REST as the preferred design pattern for APIs, and for good reason. You can request only what you need and consolidate multiple backend calls into a single HTTP request.</h3>
              <h3>But there’s a catch. Setting up your GraphQL endpoint can be extremely time consuming and prone to human error.</h3>
              <h3>If you've set up a GraphQL endpoint before, you've likely misspelled a Type definition only to get null responses from your queries and have no idea what went wrong.</h3>
              <h3>But fear not, for giraffeql.io is here to help.</h3>
            </div>

            <div className='images' style={{marginTop: '10.5%', border: 'none'}}>
              <Image src={'/frontpage/graphql.gif'} width={1770} height={926} />
            </div>

          </div>
        </section>

        <section id='four' className='box'>
          <div className={`content ${s4 ? 'fade' : ''}`} >

            <div className='images' style={{marginLeft: '5%'}} >
              <Image src={'/frontpage/createnew.gif'} width={1364} height={645} />
            </div>

            <div className='text'>
              <h2>What if I'm not using GraphQL?</h2>
              <h3>No problem!</h3>
              <h3>giraffeQL works as an end-to-end interactive SQL database design solution on it's own. Visualize your database relationships and plan your project's backend.</h3>
            </div>

          </div>
        </section>

        <section id='us' className='end-box'>

          <h4>Meet the Team!</h4>

          <div id='aboutus'>

            <div className='profile'>
              <div className='githubpic'><Image src={'https://github.com/benjitrosch.png'} width={160} height={160} /></div>
              Benjamin Trosch
              <div className='socials'>
                <div className='sclbtn'><a href='https://www.linkedin.com/in/benjitrosch/' target='_blank'><Image src={'/linkedin.svg'} width={24} height={24} /></a></div>
                <div className='sclbtn'><a href='https://github.com/benjitrosch' target='_blank'> <Image src={'/github.svg'} width={24} height={24} /></a></div>
              </div>
            </div>

            <div className='profile'>
              <div className='githubpic'><Image src={'https://github.com/theansonia.png'} width={160} height={160} /></div>
              Anson Avellar
              <div className='socials'>
                <div className='sclbtn'><a href='https://www.linkedin.com/in/ansonavellar/' target='_blank'><Image src={'/linkedin.svg'} width={24} height={24} /></a></div>
                <div className='sclbtn'><a href='https://github.com/theansonia' target='_blank'> <Image src={'/github.svg'} width={24} height={24} /></a></div>
              </div>
            </div>

            <div className='profile'>
              <div className='githubpic'><Image src={'https://github.com/dasnyder3.png'} width={160} height={160} /></div>
              Dan Snyder 
              <div className='socials'>
                <div className='sclbtn'><a href='https://www.linkedin.com/in/daniel-snyder-77aa4bbb/' target='_blank'><Image src={'/linkedin.svg'} width={24} height={24} /></a></div>
                <div className='sclbtn'><a href='https://github.com/dasnyder3' target='_blank'> <Image src={'/github.svg'} width={24} height={24} /></a></div>
              </div>          
            </div>

            <div className='profile'>
              <div className='githubpic'><Image src={'https://github.com/ericpengJoJo.png'} width={160} height={160} /></div>
              Eric Peng
              <div className='socials'>
                <div className='sclbtn'><a href='https://www.linkedin.com/in/eric-peng-40b37b13b/' target='_blank'><Image src={'/linkedin.svg'} width={24} height={24} /></a></div>
                <div className='sclbtn'><a href='https://github.com/ericpengJoJo' target='_blank'><Image src={'/github.svg'} width={24} height={24} /></a></div>
              </div>
            </div>

          </div>
        </section>

      </div>

      <style jsx>{`

        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;500;700&display=swap');

        *{
          font-family: 'Inter', sans-serif;
          transition: all .3s ease;
          font-weight: 300;
        }

        #home{
          width: 100vw;
          // height: 16000px;
          background: linear-gradient(to top, #edf2f7, white);
        }

        #scroll{
          text-align: center;
          position: fixed;
          z-index: 5;
          color: white;
          margin-left: 1%;
          margin-top: 42%;
          user-select: none;
          opacity: 0;

          animation: scrollfadein 1s forwards;
          animation-delay: 3s;
        }

        #scroll.scrollfade{
          animation: scrollfadeout 1s forwards;
        }

        @keyframes scrollfadein {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes scrollfadeout {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        section{
          width: 100%;
        }

        #header{
          height: 90vh;
          background-size: auto,cover,cover;
          background-color: #5661b3;
          overflow: hidden;
          animation: gradient 6s ease;
          // transform: skewY(2deg);
        }

        #one{
          height: 75vh;
        }

        #two{
          height: 75vh;
        }

        #three{
          height: 75vh;
        }

        #four{
          height: 75vh;
        }

        #us{
          height: 75vh;
        }

        .inner{
          transition: transform 1.5s ease,opacity 2s ease;
          transition-delay: .25s;
          opacity: 1;
          position: relative;
          z-index: 0;
          animation: fadein 2s ease;
          width: 100%;
          height: 100%;
          background: linear-gradient(-15deg, #12b3ab, #5661b3 65%);
          // background: url(/giraffepattern.svg), linear-gradient(-15deg, #12b3ab, #5661b3 65%);

          text-align: center;
          
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;  

          #logo{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            width: 100%;
            
            h1{
              font-size: 72px;
              font-family: 'Comfortaa', cursive;
              font-weight: 700;
              color: white;
              line-height: 1.5;
              margin: 0;

              span{
                font-size: 72px;
                font-family: 'Comfortaa', cursive;
                font-weight: 700;
                color: #12b3ab;
              }
            }
          }

          p{
            color: white;
            margin: 0;
            position: absolute;
            top: 55%;
            left: 35%;
          }

          #btncontainer{
            
            margin: 0;
            position: absolute;
            top: 100%;
            left: 44%;

            animation: reveal 1s forwards;
            animation-delay: 1s;

            #line{
              border-left: 1px solid white;
              height: 300px;
              margin-left: 50%;
            }
          }

          #mainbtn{
            transition: .2s;
            color: white;
            background-color: transparent;
            font-size: 24px;
            padding: 8px 16px;
            outline: none;
            border: 1px solid white;
            border-radius: 4px;

            &:hover{
              background-color: rgba(255,255,255,.15);
              cursor: pointer;
            }

          }

          @keyframes reveal {
            from { top: 100%; }
            to   { top: 75%; }
          }
        }

        @keyframes fadein {
          from { opacity: 0; transform: scale(1.1); }
          to   { opacity: 1; transform: scale(1); }
        }

        .box{
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .end-box{
          background: url(/giraffepattern.svg), radial-gradient(ellipse at top, #7b9c99 0%, #20332f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background-color: #555;
          color: #d0d3d2 !important;
          box-shadow: inset 0px 8px 16px -2px rgba(0,0,0,.15);
          z-index: 5;

          h4{
            font-size: 32px;
            font-weight: 500;
          }
        }

        .diagonal-box{

          position: relative;
          background-color: transparent;
          transition: 0;

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #12b3ab;
            transform: skewY(-2deg);
            z-index: 10;
            box-shadow: inset 0px 8px 16px -2px rgba(0,0,0,.15);
          }

          .content{

            .text{

              h2{
                color: white;
              }

              h3{
                color: white;
              }

            }

            .images{
              border: none;
            }

          }

        }

        .content{

          position: relative;
          z-index: 25;
          height: 100%;
          opacity: 0;

          &::after {
            content: "";
            display: table;
            clear: both;
          }

          .text{

            float: left;
            width: 40%;
            margin: 10% 5%;

            h2{
              color: #2c3747;
              font-size: 36px;
              font-weight: 500;
              margin: 0;
            }

            h3{
              overflow-wrap: break-word;
              font-size: 18px;
              color: #6d6ea8;
            }

            span{
              color: #12b3ab;
              font-weight: bold;
            }

          }

          .images{
            float: left;
            width: 40%;
            margin: 7% 0%;
            border: 4px solid #b2becc;
            border-radius: 4px;
          }
        }

        .content.fade{
          animation: fadeIn 1s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        #aboutus{
          display: flex;
        }

        .githubpic{
          clip-path: circle(80px at center);
          margin: 8px;
        }

        .profile{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 32px;
          font-size: 24px;
          font-weight: 700;
        }

        .socials{
          margin: 8px;
          display: flex;
        }

        .sclbtn{
          transition: all .2s;
          margin: 8px;

          &:hover{
            transform: scale(1.1);
          }
        }

        @media screen and (max-width: 700px) {

          home{
            overflowX: hidden;
          }

          #logo{
            transform: scale(.75);
          }

          #btncontainer{
            left: 33% !important;
          }

          #line{
            opacity: 0 !important;
          }

          .text {

            width: 80% !important;
            text-align: center;
            margin: 0% !important;
            margin-top: 10% !important;
            margin-left: 10% !important;

            h2{
              font-size: 24px !important;
            }

            h3{
              font-size: 12px !important;
            }
          }

          .images{
            width: 80% !important;
            margin: 0% !important;
            margin-left: 10% !important;
          }

          #aboutus{
            transform: scale(.75);
          }
  
          .githubpic{
            clip-path: circle(32px at center);
            margin: 2px;
          }

        }

      `}</style>
        
    </div>

  );
}

export async function getServerSideProps (ctx) {

  const props = {}

  const { authorization } = parseCookies(ctx);
  const { token } = ctx.query
  props.user = await getUser(authorization || token);
  return {props};
}

export default Home;

