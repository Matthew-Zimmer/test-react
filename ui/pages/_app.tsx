import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo';
import { SubscriptionHandler } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SubscriptionHandler />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
