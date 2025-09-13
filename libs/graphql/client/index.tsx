import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const apollo = new ApolloClient({
  link: new HttpLink({ uri: 'https://countries.trevorblades.com' }), // replace with your API
  cache: new InMemoryCache(),
});