import React from 'react';
import { colors } from './src/Utils/colors'; // Import colors
import Main from './src/Main'; // Import Main component
import { StyleSheet, View, Text } from 'react-native'; // React Native components

const App: React.FC = () => {
  // Styles for React Native
  const styles = StyleSheet.create({
    appContainer: {
      backgroundColor: colors.background, // Using colors from colors.js
      color: colors.text,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex', // Mimicking web-like layout
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
  });

  return (
    // <View style={styles.appContainer}>
    //   <Text style={styles.header}>Welcome to SafeLink</Text>
      <Main />
    // </View>
  );
};

export default App;
