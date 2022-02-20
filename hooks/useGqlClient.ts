import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useEffect, useState } from "react";

export default () => {


  const [token, setToken] = useState<null | string>(null);

  const httpLink = createHttpLink({
    uri: "http://localhost:4000/"
  })
  
  const authLink = setContext((_, {headers}) => {
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

  return {client, setToken};
}