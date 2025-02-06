import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const LoginSelectionScreen = ({ navigation }) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleDaughterLogin = () => {
    setSelectedOption('daughter');
    setIsButtonEnabled(true);
  };

  const handleParentLogin = () => {
    setSelectedOption('parent');
    setIsButtonEnabled(true);
  };

  const handleNextPress = () => {
    if (selectedOption === 'daughter') {
      navigation.navigate('DaughterLoginScreen');
    } else if (selectedOption === 'parent') {
      navigation.navigate('ParentLoginScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Login Type</Text>

      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[styles.optionBox, selectedOption === 'daughter' && styles.selectedBox]}
          onPress={handleDaughterLogin}
        >
          <LottieView
            source={require('../../assets/LottieJason/daughter-login.json')}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={[styles.optionText, selectedOption === 'daughter' && styles.selectedText]}>
            Login as Child
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionBox, selectedOption === 'parent' && styles.selectedBox]}
          onPress={handleParentLogin}
        >
          <LottieView
            source={require('../../assets/LottieJason/parent-login.json')}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={[styles.optionText, selectedOption === 'parent' && styles.selectedText]}>
            Login as Parent
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isButtonEnabled ? '#4CAF50' : '#9E9E9E' }]}
        disabled={!isButtonEnabled}
        onPress={handleNextPress}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  optionBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.4,
    height: width * 0.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 10,
  },
  selectedBox: {
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  optionText: {
    fontSize: 19,
    marginTop: 10,
    textAlign: 'center',
    color: '#555',
  },
  selectedText: {
    color: '#4CAF50',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginTop: 30,
    width: '95%',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  animation: {
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: 'transparent',
  },
});

export default LoginSelectionScreen;
