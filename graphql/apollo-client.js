import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import 'cross-fetch/polyfill';
import { getUserToken, localforageClear ,getIsAdmin} from "utils/lib";
import { setContext } from "apollo-link-context";
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
// import { WebSocketLink } from 'apollo-link-ws';
import { WebSocketLink } from "@apollo/client/link/ws";
import { ApolloLink } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";


const httpLink = createUploadLink({
  uri: process.env.REACT_APP_API_URL,
});

const wsLink = process.browser ? new WebSocketLink({
  uri: process.env.REACT_APP_WEB_SOCKET_URL,
  options: {
    reconnect: true,
    connectionParams: async () => {
      let token = await getUserToken();
      return ({
        authorization: `${token ? token : ''}`,
      })
    },
  },
}) : null;


const authLink = setContext(async (_, { headers }) => {
  let token = await getUserToken();
  let isAdmin=await getIsAdmin()
  return {
    headers: {
      ...headers,
      authorization: `${token ? token : ''}`,
      is_admin:isAdmin
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case "UNAUTHENTICATED":
          localforageClear();
      }
    }
  }
})

function splitByOperation({ query }) {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
}


const link =
  wsLink !== null ? ApolloLink.from([
    errorLink,
    ApolloLink.split(
      // split based on operation type
      splitByOperation,
      wsLink,
      authLink.concat(httpLink)
    ),
  ]) :
    process.env.REACT_APP_WEB_SOCKET_URL;


process.browser

const client = process.browser ?

  new ApolloClient({
    link: link,
    cache: new InMemoryCache({addTypename: false})
  })
  :
  new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache({addTypename: false})
  })
  ;

  console.log(client, "========")

export default client;