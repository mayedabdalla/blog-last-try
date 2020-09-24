import React from "react";
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from '@apollo/client';
import type {AppProps /*, AppContext */} from 'next/app'
import '../styles/globals.css'
import '../styles/index.css'
const client = new ApolloClient({
    uri: 'api/graphql',
    cache: new InMemoryCache()
});

function MyApp({Component, pageProps}: AppProps) {
    return <ApolloProvider client={client}><Component {...pageProps} /></ApolloProvider>
}

export default MyApp
