// src/navigation/ParentDrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ParentDashboard from '../Screens/ParentDashboard';
import ParentProfile from '../Screens/Settings/ParentProfile';
import HelpSupport from '../Screens/HelpSupport'; // Make sure this is a unique import

const Drawer = createDrawerNavigator();

const ParentDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="ParentDashboard">
      <Drawer.Screen name="Dashboard" component={ParentDashboard} />
      <Drawer.Screen name="Profile" component={ParentProfile} />
      <Drawer.Screen name="Help & Support" component={HelpSupport} />
    </Drawer.Navigator>
  );
};

export default ParentDrawerNavigator;
