import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppIntroSlider from '../Screens/AppIntroSlider'; // Import your AppIntroSlider
import LoginSelectionScreen from '../Screens/LoginSelection'; // Import the LoginSelectionScreen
import DaughterLogin from '../Screens/DaughterLogin'; // Uncomment when DaughterLoginScreen is ready
import ParentLogin from '../Screens/ParentLogin';
import PDashboard from '../Screens/ParentDashboard'; // Replace with your Dashboard component
import TrustedContacts from '../Screens/TrustedContacts';
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
        <Stack.Screen
          name="ParentLoginScreen"
          component={ParentLogin}
          options={{ headerShown: false }} // Hide header for LoginSelectionScreen
        />
    
        <Stack.Screen
          name="ParentDashboard"
          component={PDashboard}
          options={{ headerShown: false }} // Hide header for Dashboard
        />
        <Stack.Screen
          name="TContacts"
          component={TrustedContacts}
          options={{ headerShown: false }} // Hide header for Dashboard
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
