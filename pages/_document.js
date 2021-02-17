import Document, { Html, Head, Main, NextScript } from 'next/document'
import { setCookie } from 'nookies';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        console.log('ctx.query: ', ctx.query)
        if (ctx.query.code) {
            // console.log('about to set cookie');
            setCookie(ctx, 'authorization', ctx.query.code, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });
        }

        return { ...initialProps }
    }
    
    render() {
        
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument