import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const ImageComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Component Example</Text>

      {/* Local Image */}
      <Text style={styles.label}>Local Image:</Text>
      <Image
        source={require('../../assests/images/abc.jpg')} // Replace with your local image path
        style={styles.image}
      />

      {/* Remote Image */}
      {/* <Text style={styles.label}>Remote Image:</Text>
      <Image
        source={{
          uri: 'https://via.placeholder.com/150', // Replace with your image URL
        }}
        style={styles.image}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  image: {
    width: 150, // Width of the image
    height: 150, // Height of the image
    borderRadius: 10, // Optional: Rounds the corners
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
});

export default ImageComponent;
