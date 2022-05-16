import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Grouped, getData1, getData2, Author } from '../components'
import styles from '../styles/Home.module.css'

import { gql, useQuery } from '@apollo/client';
import { cache } from '../apollo'

export const GET_AUTHORS = gql`
  query getAuthors {
    authors {
      details {
        id
        firstName
        lastName
      }
    }
  }
`;

export default function HomePage() {
  const { loading, error, data } = useQuery<{ authors: { details: { id: string }[] } }>(GET_AUTHORS);

  if (loading) return <p>Loading</p>;

  if (error) return <p>error: {JSON.stringify(error)}</p>;

  const authors = data!.authors.details;

  return (
    <>
      <button onClick={() => cache.reset()} >RESET CACHE</button>
      <p>Authors</p>
      {authors.map((a: any) => <Author authorID={a.id} key={a.id} />)}
    </>
  );
}
