import React from 'react';
import { StyleSheet, View } from 'react-native'; // React Native components
import AppNavigator from './src/Navigation/AppNavigator'; // Import AppNavigator

const App: React.FC = () => {
  // Styles for React Native
  const styles = StyleSheet.create({
    appContainer: {
      flex: 1,  // Ensure the container takes up the full screen
    },
  });

  return (
    <View style={styles.appContainer}>
      {/* AppNavigator takes care of the navigation and rendering of screens */}
      <AppNavigator />
    </View>
  );
};

export default App;
