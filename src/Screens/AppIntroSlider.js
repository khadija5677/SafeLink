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
    animation: require('../../assests/LottieJason/loading.json'),  // Corrected path here
    backgroundColor: '#283593',
  },
  {
    key: '2',
    title: 'Emergency Assistance',
    text: 'Quickly alert authorities and family during emergencies.',
    animation: require('../../assests/LottieJason/loading.json'),  // Correct path for other animations
    backgroundColor: '#FF4081',
  },
  {
    key: '3',
    title: 'Safe Zones',
    text: 'Mark and get notified about safe zones in your area.',
    animation: require('../../assests/LottieJason/loading.json'),  // Correct path for other animations
    backgroundColor: '#00E5FF',
  },
];

const AppIntro = ({ navigation }) => {
  // Render each slide
  const renderSlide = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <LottieView
        source={item.animation}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const onDone = () => {
    navigation.replace('ChoicePage'); // Navigate to login after intro
  };

  return (
    <AppIntroSlider
      renderItem={renderSlide}
      data={slides}
      onDone={onDone}
      showSkipButton
      onSkip={onDone}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  dot: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  activeDot: {
    backgroundColor: '#333',
  },
});

export default AppIntro;
