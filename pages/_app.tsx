import { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/global.scss";
import { ApolloProvider } from "@apollo/client";
import client from "../apolloClient";
import { AuthProvider } from "../context/authContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default MyApp;
