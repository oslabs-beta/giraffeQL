import Document, { Html, Head, Main, NextScript } from 'next/document'
import { setCookie } from 'nookies';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        if (ctx.query.code) {
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