import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

// Example slides data
const slides = [
  {
    key: '1',
    title: 'Stay Connected',
    text: 'Share your location with trusted contacts in real-time.',
    animation: require('../../assets/LottieJason/location-sharing.json'), // Ensure this file exists
    backgroundColor: '#283593',
  },
  {
    key: '2',
    title: 'Watch Assistant',
    text: 'Control and monitor your safety features directly from your smartwatch.',
    animation: require('../../assets/LottieJason/watch-assistant.json'), // Ensure this file exists
    backgroundColor: '#FF4081',
  },
  {
    key: '3',
    title: 'Emergency Assistance',
    text: 'Quickly alert authorities and family during emergencies.',
    animation: require('../../assets/LottieJason/SOS.json'), // Ensure this file exists
    backgroundColor: '#00E5FF',
  },
];

const AppIntro = ({ navigation }) => {
  // Render each slide
  const renderSlide = ({ item }) => {
    return (
      <View style={[styles.slide, {backgroundColor: item.backgroundColor }]}>
        {item.animation && (
          <LottieView
            source={item.animation}
            autoPlay
            loop
            style={styles.animation}
          />
        )}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  // Handle Done button press
  const onDone = () => {
    navigation.navigate('LoginSelectionScreen'); // Navigate to the LoginSelection screen after the slider
  };

  // Custom render for Next button
  const renderNextButton = () => (
    <View style={styles.button}>
      <Text style={styles.buttonText}>Next</Text>
    </View>
  );

  // Custom render for Done button
  const renderDoneButton = () => (
    <View style={styles.button}>
      <Text style={styles.buttonText}>Done</Text>
    </View>
  );

  // Custom render for Skip button
  const renderSkipButton = () => (
    <View style={styles.button}>
      <Text style={styles.buttonText}>Skip</Text>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderSlide}
      data={slides}
      onDone={onDone}
      showSkipButton
      onSkip={onDone} // If skip is pressed, go directly to LoginSelection
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      renderSkipButton={renderSkipButton}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  animation: {
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: 'transparent', // Ensure background is transparent
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF', // Ensure text color contrasts with the background
    marginTop: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: '#FFF', // Ensure text color contrasts with the background
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFF',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});

export default AppIntro;
