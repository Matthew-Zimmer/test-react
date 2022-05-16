import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
//import WebSocket from 'ws';

export const cache: InMemoryCache = new InMemoryCache(
    {
        typePolicies: {
            Query: {
                fields: {
                    authors: {
                        read(_, { args, toReference }) {
                            if (args?.where?.ids?.length === 1) {
                                const [id] = args.where.ids;
                                const ref = toReference({
                                    __typename: 'AuthorDetail',
                                    id,
                                });
                                return { __typename: 'Authors', details: [ref] };
                            }
                        }
                    }
                },
            },

        },
    }
);

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000/graphql',
    webSocketImpl: typeof window !== "undefined" ? WebSocket : require('ws')
}));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export const client = new ApolloClient({
    cache: cache,
    link: splitLink,
    assumeImmutableResults: true
});
