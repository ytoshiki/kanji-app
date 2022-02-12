import { AppProps } from 'next/app'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { ApolloProvider, gql, useLazyQuery } from "@apollo/client";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useEffect } from 'react';


const httpLink = createHttpLink({
  uri: "http://localhost:4000/"
})

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("kanji-gql-token");
  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  
});



function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
