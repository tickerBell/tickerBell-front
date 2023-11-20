import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "https://countries.trevorblades.com",
  uri: "http://3.37.206.141/graphql",
  cache: new InMemoryCache(),
});

export default client;
