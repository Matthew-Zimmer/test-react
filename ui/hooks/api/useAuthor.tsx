import { gql, useQuery, DocumentNode } from '@apollo/client';

export function useAuthor<T>(query: DocumentNode, id: string) {
    const { loading, error, data } = useQuery(query, {
        variables: { where: { ids: [id] } },
    });

    return {
        loading,
        error,
        author: data?.authors?.details?.[0] as T
    }
}
