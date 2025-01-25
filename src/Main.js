import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ResponsiveText from './Components/ResponsiveText';

const Main = () => {
  return (
    <View style={styles.container}>
      <ResponsiveText size={10}>Responsive Font Size</ResponsiveText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
});

export default Main;
