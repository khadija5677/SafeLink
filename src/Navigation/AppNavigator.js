import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppIntroSlider from '../Screens/AppIntroSlider'; // Import your AppIntroSlider
import LoginSelectionScreen from '../Screens/LoginSelection'; // Import the LoginSelectionScreen
import DaughterLogin from '../Screens/DaughterLogin'; // Uncomment when DaughterLoginScreen is ready
import ParentLogin from '../Screens/ParentLogin';
//import Dashboard from '../Screens/Dashboard'; // Replace with your Dashboard component

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AppIntro">
        <Stack.Screen
          name="AppIntro"
          component={AppIntroSlider}
          options={{ headerShown: false }} // Hide header for AppIntroSlider
        />
        <Stack.Screen
          name="LoginSelectionScreen"
          component={LoginSelectionScreen}
          options={{ headerShown: false }} // Hide header for LoginSelectionScreen
        />
        <Stack.Screen
          name="DaughterLoginScreen"
          component={DaughterLogin}
          options={{ headerShown: false }} // Hide header for LoginSelectionScreen
        />
        {/* <Stack.Screen
          name="ParentLoginScreen"
          component={ParentLogin}
          options={{ headerShown: false }} // Hide header for LoginSelectionScreen
        /> */}
    
        {/* <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }} // Hide header for Dashboard
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
