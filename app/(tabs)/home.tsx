import { GET_COUNTRIES } from '@/libs/graphql/queries/countries';
import { useQuery } from '@apollo/client/react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { data, loading, error, refetch } = useQuery(GET_COUNTRIES, {
    variables: { code: 'US' },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>

      {loading && (
        <ActivityIndicator size="small" color="#333" />
      )}

      {!loading && !!error && (
        <Text style={styles.error}>{error instanceof Error ? error.message : 'An error occurred'}</Text>
      )}

      {!loading && !error && data && (
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.quote}>{`Countries (${data.countries.length})`}</Text>
          {data.country && (
            <Text style={styles.author}>{`Sample: ${data.country.name} (${data.country.code}) ${data.country.emoji}`}</Text>
          )}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={() => refetch()} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading…' : 'Refetch'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
  },
  header: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 16,
      color: '#111',
  },
  quote: {
      fontSize: 18,
      lineHeight: 26,
      color: '#222',
      textAlign: 'center',
      marginBottom: 8,
  },
  author: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 24,
  },
  error: {
      color: '#b00020',
      marginBottom: 16,
      textAlign: 'center',
  },
  button: {
      marginTop: 12,
      backgroundColor: '#111',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
  },
  buttonText: {
      color: '#fff',
      fontWeight: '600',
  },
});