import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const ImageBackgroundComponent = (props) => {
  return (
    <ImageBackground
      source={require('../../assests/images/background.jpg')} // Update path as per your project
      style={styles.background}
      resizeMode="cover" // Ensures the image covers the entire background
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to SafeLink</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensures the background takes up the full screen
    // width: '100%', // Full width of the screen
    // height: '', // Full height of the screen
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default ImageBackgroundComponent;
