import Document, {Html, Head, Main, NextScript} from 'next/document'


export default class MyDocument extends Document {
    public render () {
        return (
            <Html lang="en">
                <Head>
                    <title>Apple Music Analyser</title>
                    <meta name="description" content="Apple Music activities visualization." />

                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fa243c" />
                    <meta name="msapplication-TileColor" content="#b91d47" />
                    <meta name="theme-color" content="#fa243c" />

                    <meta name="robots" content="all" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
