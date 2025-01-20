import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AppIntro from '../Screens/AppIntroSlider';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AppIntro"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AppIntro" component={AppIntro} />
    
    </Stack.Navigator>
  );
};

export default AppNavigator;