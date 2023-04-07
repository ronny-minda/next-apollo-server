import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client'
import '@/styles/globals.css'


const client = new ApolloClient({
  cache: new InMemoryCache,
  link: new HttpLink({
    uri: 'https://next-apollo-server.vercel.app/api/graphql'
  })  
})

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
