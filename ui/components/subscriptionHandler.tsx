import { gql, useSubscription } from '@apollo/client';
import { GET_AUTHORS } from '../pages';
import { GET_AUTHOR } from './api';

const LISTEN_EVENT_TAPE = gql`
    subscription listenEventTape {
        eventTape {
            domain
            kind
            resourceID
        }
    }
`;

const refetchQueries = {
    user: gql`
        query refetchAuthor($where: WhereClause) {
            authors(where: $where) {
                details {
                    id
                    firstName
                    lastName
                }
            }
        }
    `,
};

export function SubscriptionHandler() {
    const { loading, error, data } = useSubscription(LISTEN_EVENT_TAPE, {
        onSubscriptionData: ({ client, subscriptionData: { data } }) => {
            const { resourceID, domain } = data.eventTape;
            console.log(domain);
            client.query({
                query: (refetchQueries as any)[domain],
                variables: { where: { ids: [resourceID] } },
                fetchPolicy: 'network-only'
            });
        },
    });

    if (error) console.error(error);

    return null;
}
