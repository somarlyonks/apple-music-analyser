import Head from 'next/head'
import 'react-tooltip/dist/react-tooltip.css'
import 'src/styles/globals.scss'


export default function MyApp ({Component, pageProps}: ANY) {
    return (
        <>
            <Head>
                <title>Apple Music Analyser</title>
                <meta name="description" content="Apple Music activities visualization." />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fa243c" />
                <meta name="msapplication-TileColor" content="#b91d47" />
                <meta name="theme-color" content="#ffffff" />

                <meta name="robots" content="all" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}
