import { ReactFlowProvider }  from 'react-flow-renderer';

import '../styles/globals.css'
import 'highlight.js/styles/an-old-hope.css';

const MyApp = ({ Component, pageProps }) => {
  return <ReactFlowProvider><Component {...pageProps} /></ReactFlowProvider>
}

export default MyApp
