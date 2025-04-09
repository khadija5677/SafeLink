import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelpSupportScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Help & Support</Text>
  </View>
);

export default HelpSupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
