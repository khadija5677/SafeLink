import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ParentProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.content}>Name: John Doe</Text>
      <Text style={styles.content}>Email: john@example.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  content: { fontSize: 16 },
});

export default ParentProfile;
