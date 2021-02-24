import '../styles/globals.scss';
import 'highlight.js/styles/vs2015.css';

import Provider from '../context/state.js';

const MyApp = ({ Component, pageProps }) => {
  return (
  <Provider>
    <Component {...pageProps} />
  </Provider>);
}

export default MyApp
