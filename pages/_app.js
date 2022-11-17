import { ChakraProvider } from '@chakra-ui/react'
import App from "next/app";
import Head from "next/head"
import Script from 'next/script'
import { SessionProvider } from 'next-auth/react'

import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "../store/store";



function MyApp({ Component,
    pageProps: { session, ...pageProps },
}) {
    const store = useStore((state) => state);

    return (
        <ChakraProvider>
            <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
                <Head>
                    <title>Auto Twisty | ISU Blinds Controller</title>
                    <Script src="https://ok1static.oktacdn.com/assets/js/sdk/okta-signin-widget/2.16.0/js/okta-sign-in.min.js" />
                </Head>
                <SessionProvider session={session}>
                    <Component {...pageProps} />
                </SessionProvider>
            </PersistGate>
        </ChakraProvider>
    );
}

export default wrapper.withRedux(MyApp);