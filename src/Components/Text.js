import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const TextComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, this is a Text component!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default TextComponent;
