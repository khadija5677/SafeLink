import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './Utils/colors'; // import path for colors.js
import TextInputComponent from './Components/TextInput'; // Import TextInput component
import ImageComponent from './Components/Image'; // Import ImageComponent
import ImageBackgroundComponent from './Components/ImageBackground';
import TextComponent from './Components/Text';
import AppNavigator from './Navigation/AppNavigator';
//import ResponsiveText from './Components/ResponsiveText'; // import ResponsiveText component

const Main = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.header}>
          <Text style={styles.title}>React Native Text Input </Text>
        </View> */}
        <View style={styles.content}>
          {/* <TextInputComponent /> */}
          {/* <ImageComponent /> */}
          {/* <ImageBackgroundComponent /> */}
          <TextComponent />
          {/* <AppNavigator /> */}
        </View>
        {/* <View style={styles.footer}>
          <ResponsiveText size={2} style={styles.footerText}>
            Responsive Font Size
          </ResponsiveText>
        </View> */}
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Use background color from colors.js
  },
  header: {
    padding: 20,
    backgroundColor: colors.primary, // Use primary color for header
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryDark,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.backgroundLight, // Light color for contrast
    textAlign: 'center',
  },
  content: {
    flex: 1,
    //paddingHorizontal: 20,
    justifyContent: 'center',
  },
  footer: {
    padding: 20,
    backgroundColor: colors.secondary, // Secondary color for footer
    borderTopWidth: 2,
    borderTopColor: colors.secondaryDark,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: colors.textLight, // Text light color for footer
  },
});

export default Main;
