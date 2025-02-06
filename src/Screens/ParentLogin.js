import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
//import { Picker } from '@react-native-picker/picker';  // Correct import

const ParentLogin = ({ navigation }) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [email, setEmail] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [address, setAddress] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);

  // Function to generate a 6-digit random code
  const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  // Function to send verification code
  const sendVerificationCode = () => {
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    const code = generateCode();
    setSentCode(code);
    setIsCodeSent(true);
    Alert.alert('Verification Code Sent', `Your code is: ${code}`);
  };

  // Function to verify the entered code
  const verifyCode = () => {
    if (verificationCode === sentCode) {
      Alert.alert('Login Successful', 'Welcome to the Parent Dashboard!');
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Invalid Code', 'Please enter the correct verification code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parent Login</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* Relation with Child Dropdown */}
      <Picker
        selectedValue={relation}
        style={styles.picker}
        onValueChange={(itemValue) => setRelation(itemValue)}
      >
        <Picker.Item label="Select Relation" value="" />
        <Picker.Item label="Father" value="Father" />
        <Picker.Item label="Mother" value="Mother" />
        <Picker.Item label="Guardian" value="Guardian" />
      </Picker>

      {/* Contact Details Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        value={contactDetails}
        onChangeText={setContactDetails}
        keyboardType="phone-pad"
      />

      {/* Address Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Send Code Button */}
      <TouchableOpacity style={styles.button} onPress={sendVerificationCode}>
        <Text style={styles.buttonText}>Send Verification Code</Text>
      </TouchableOpacity>

      {/* Code Input (only visible after sending code) */}
      {isCodeSent && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={verifyCode}>
            <Text style={styles.buttonText}>Verify & Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    color: '#000000',
  },
  picker: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    color: '#000000',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ParentLogin;
