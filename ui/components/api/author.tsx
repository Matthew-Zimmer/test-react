import { gql } from '@apollo/client';
import { useAuthor } from '../../hooks';

export interface AuthorProps {
    authorID: string;

    className?: string;
}

export const GET_AUTHOR = gql`
    query getAuthor($where: WhereClause) {
        authors(where: $where) {
            details {
                id
                firstName
                lastName
            }
        }
    }
`;

export function Author(props: AuthorProps) {
    let { authorID, className } = props;

    const { loading, error, author } = useAuthor<{ id: string, firstName: string, lastName: string }>(GET_AUTHOR, authorID);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>An error occurred: {JSON.stringify(error)}</p>;

    return <p className={className}>Author: {author?.firstName} {author?.lastName}: {author?.id}</p>;
}
