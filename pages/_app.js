/* NextJS imports */
import React from 'react';

import { AuthProvider } from './context/AuthContext.js';
import { TimeProvider } from './context/TimeContext.js';
import { TorneioProvider } from './context/TorneioContext.js';

export default function MyApp({ Component, pageProps }) {
    return (
    <>   
    <AuthProvider>
    <TimeProvider>
    <TorneioProvider>
        <Component {...pageProps} />
    </TorneioProvider>
    </TimeProvider>
    </AuthProvider>

    <style jsx global>{`
        * {
            padding: 0px;
            margin: 0px;
            box-sizing: border-box;
        }

        body {
            font-family: Montserrat, sans-serif;
            background-color: #212121;
        }

        p {
            padding: 7px 4vw;
            text-indent: 32px;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: inherit;
            font-weight: Normal;
        }
        `}</style>
    </>
    )
}