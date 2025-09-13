// ExpoSampleApp/app/_layout.tsx
import { ApolloProvider } from '@apollo/client/react';
import { Slot } from 'expo-router';
import { apollo } from '@/libs/graphql/client';
import { Provider } from 'react-redux';
import { store } from '@/libs/redux/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ApolloProvider client={apollo}>
        <Slot />
      </ApolloProvider>
    </Provider>
   
  );
}