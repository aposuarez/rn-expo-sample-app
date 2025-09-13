import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

export default function HomeScreen() {
 
  return (
    <View style={styles.container}>
        <Text>Home</Text>
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
});