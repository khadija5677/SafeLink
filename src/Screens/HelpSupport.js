import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelpSupport = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help & Support</Text>
      <Text style={styles.content}>If you have any issues, please contact us at support@example.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  content: { fontSize: 16 },
});

export default HelpSupport;
