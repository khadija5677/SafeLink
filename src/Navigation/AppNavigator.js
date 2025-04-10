// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ParentDrawerNavigator from './ParentDrawerNavigator';


// Screens
import AppIntroSlider from '../Screens/AppIntroSlider';
import LoginSelectionScreen from '../Screens/LoginSelection';
import DaughterLogin from '../Screens/DaughterLogin';
import DaughterDashboard from '../Screens/DaughterDashboard';
import ParentLogin from '../Screens/ParentLogin';
import PDashboard from '../Screens/ParentDashboard';
import TrustedContacts from '../Screens/TrustedContacts';

// Settings Pages of children
import Profile from '../Screens/Settings/Profile';
import EmergencyContacts from '../Screens/Settings/EmergencyContacts';
import LocationSettings from '../Screens/Settings/LocationSettings';
import SoundVibration from '../Screens/Settings/SoundVibration';
import AppPermissions from '../Screens/Settings/AppPermissions';
import SecuritySettings from '../Screens/Settings/SecuritySettings';
import HelpSupport from '../Screens/Settings/HelpSupport';

//settings Pages of parents
import ParentProfile from '../Screens/Settings/ParentProfile';
import HelpSupport from '../Screens/HelpSupport';

// Context
import { ProfileProvider } from '../context/ProfileContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AppIntro" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AppIntro" component={AppIntroSlider} />
          <Stack.Screen name="LoginSelectionScreen" component={LoginSelectionScreen} />
          <Stack.Screen name="DaughterLogin" component={DaughterLogin} />
          <Stack.Screen name="DaughterDashboard" component={DaughterDashboard} />
          <Stack.Screen name="ParentLogin" component={ParentLogin} />
          <Stack.Screen name="TrustedContacts" component={TrustedContacts} />

          <Stack.Screen name="ParentDashboard" component={ParentDrawerNavigator} />


          {/* Settings Pages */}
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
          <Stack.Screen name="LocationSettings" component={LocationSettings} />
          <Stack.Screen name="SoundVibration" component={SoundVibration} />
          <Stack.Screen name="AppPermissions" component={AppPermissions} />
          <Stack.Screen name="SecuritySettings" component={SecuritySettings} />
          <Stack.Screen name="HelpSupport" component={HelpSupport} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
};

export default AppNavigator;
