import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppIntroSlider from '../Screens/AppIntroSlider';
import LoginSelectionScreen from '../Screens/LoginSelectionScreen';
import DaughterLogin from '../Screens/DaughterLogin';
import ParentLogin from '../Screens/ParentLogin';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AppIntro">
        <Stack.Screen
          name="AppIntro"
          component={AppIntroSlider}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginSelectionScreen"
          component={LoginSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DaughterLogin"
          component={DaughterLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ParentLogin"
          component={ParentLogin}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
