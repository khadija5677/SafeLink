import React from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Stay Connected',
    text: 'Share your location with trusted contacts in real-time.',
    animation: require('../../assets/LottieJason/location-sharing.json'),
    backgroundColor: '#283593',
  },
  {
    key: '2',
    title: 'Watch Assistant',
    text: 'Control and monitor your safety features directly from your smartwatch.',
    animation: require('../../assets/LottieJason/watch-assistant.json'),
    backgroundColor: '#FF4081',
  },
  {
    key: '3',
    title: 'Emergency Assistance',
    text: 'Quickly alert authorities and family during emergencies.',
    animation: require('../../assets/LottieJason/SOS.json'),
    backgroundColor: '#00E5FF',
  },
];

const AppIntro = ({ navigation }) => {
  const requestPermissions = async () => {
    try {
      // Request Location Permission (Foreground Only)
      const locationPermission = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );

      if (locationPermission !== RESULTS.GRANTED) {
        Alert.alert("Location Permission Required", "Please enable location to continue.");
      }

      // Request Notification Permission
      if (PERMISSIONS.ANDROID.POST_NOTIFICATIONS) {
        const notificationPermission = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        if (notificationPermission !== RESULTS.GRANTED) {
          Alert.alert("Notification Permission Required", "Please enable notifications.");
        }
      }

      // Request Camera Permission
      const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
      if (cameraPermission !== RESULTS.GRANTED) {
        Alert.alert("Camera Permission Required", "Please enable camera access.");
      }

      // Navigate to Login Screen after permissions
      navigation.replace('LoginSelectionScreen');

    } catch (error) {
      console.error("Permission Error:", error);
      navigation.replace('LoginSelectionScreen'); // Navigate even if an error occurs
    }
  };

  const onDone = () => {
    requestPermissions(); // Request permissions after the last slide
  };

  const renderSlide = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      {item.animation && (
        <LottieView source={item.animation} autoPlay loop style={styles.animation} />
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderSlide}
      data={slides}
      onDone={onDone}
      showSkipButton
      onSkip={onDone}
      renderNextButton={() => <View style={styles.button}><Text style={styles.buttonText}>Next</Text></View>}
      renderDoneButton={() => <View style={styles.button}><Text style={styles.buttonText}>Done</Text></View>}
      renderSkipButton={() => <View style={styles.button}><Text style={styles.buttonText}>Skip</Text></View>}
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
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: '#FFF',
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
