import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AppIntro from '../Screens/AppIntroSlider';
import ChoicePage from '../Screens/ChoicePage'

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AppIntro"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AppIntro" component={AppIntro} />
      <Stack.Screen name="ChoicePage" component={ChoicePage} />

    </Stack.Navigator>
  );
};

export default AppNavigator;