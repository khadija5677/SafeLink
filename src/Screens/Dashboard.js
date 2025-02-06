import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Dashboard!</Text>

      {/* Example Button to navigate to another screen */}
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')} // Replace 'Profile' with your desired screen name
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Dashboard;
