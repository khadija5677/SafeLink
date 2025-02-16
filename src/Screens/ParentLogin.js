import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';

const ParentLogin = ({ navigation }) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [email, setEmail] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) newErrors.name = 'This is a compulsory field.';
    if (!relation) newErrors.relation = 'Please select a relation.';
    if (!emailRegex.test(email)) newErrors.email = 'Enter a valid email.';
    if (contactDetails.length !== 10) newErrors.contactDetails = 'Enter a 10-digit number.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const sendVerificationCode = () => {
    if (!validateFields()) return;
    const code = generateCode();
    setSentCode(code);
    setIsCodeSent(true);
    Alert.alert('Verification Code Sent', `Your code is: ${code}`);
  };

  const verifyCode = () => {
    if (verificationCode === sentCode) {
      Alert.alert('Login Successful', 'Welcome to the Parent Dashboard!');
      navigation.navigate('ParentDashboard');
    } else {
      Alert.alert('Invalid Code', 'Please enter the correct verification code.');
    }
  };

  return (
    <LinearGradient 
      colors={['#64B5F6', '#FF80AB']} 
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Parent Login</Text>

        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <View style={[styles.pickerContainer, errors.relation && styles.inputError]}>
          <Picker selectedValue={relation} onValueChange={(itemValue) => setRelation(itemValue)}>
            <Picker.Item label="Select Relation" value="" />
            <Picker.Item label="Father" value="Father" />
            <Picker.Item label="Mother" value="Mother" />
            <Picker.Item label="Guardian" value="Guardian" />
          </Picker>
        </View>
        {errors.relation && <Text style={styles.errorText}>{errors.relation}</Text>}

        <TextInput
          style={[styles.input, errors.contactDetails && styles.inputError]}
          placeholder="Enter phone number"
          value={contactDetails}
          onChangeText={setContactDetails}
          keyboardType="phone-pad"
        />
        {errors.contactDetails && <Text style={styles.errorText}>{errors.contactDetails}</Text>}

        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TouchableOpacity style={styles.button} onPress={sendVerificationCode}>
          <Text style={styles.buttonText}>Send Verification Code</Text>
        </TouchableOpacity>

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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0D47A1',
  },
  input: {
    height: 50,
    borderColor: '#90CAF9',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#0D47A1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ParentLogin;
