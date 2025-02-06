import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
//import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

const DaughterLogin = ({ navigation }) => {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [brotherName, setBrotherName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [photo, setPhoto] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([{ number: '' }]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Handle input changes to enable or disable the Submit button
  const handleInputChange = () => {
    if (
      name &&
      fatherName &&
      brotherName &&
      address &&
      email &&
      age &&
      bloodGroup &&
      height &&
      weight &&
      photo &&
      emergencyContacts.every(contact => contact.number)
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  // Check if the email is valid
  const isValidEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (isButtonEnabled) {
      if (!isValidEmail(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }
      Alert.alert('Profile Updated', 'Your profile has been successfully updated!');
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  // Function to launch image picker
  const handlePhotoUpload = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        setPhoto(response.assets[0].uri); // Set the selected photo's URI
        handleInputChange(); // Re-check if the form is filled
      }
    });
  };

  // Add a new emergency contact field
  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { number: '' }]);
  };

  // Remove an emergency contact field
  const removeEmergencyContact = (index) => {
    const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
    setEmergencyContacts(updatedContacts);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => { setName(text); handleInputChange(); }}
      />

      <TextInput
        style={styles.input}
        placeholder="Father's Name"
        value={fatherName}
        onChangeText={(text) => { setFatherName(text); handleInputChange(); }}
      />

      <TextInput
        style={styles.input}
        placeholder="Brother's Name"
        value={brotherName}
        onChangeText={(text) => { setBrotherName(text); handleInputChange(); }}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => { setAddress(text); handleInputChange(); }}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => { setEmail(text); handleInputChange(); }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={(text) => { setAge(text); handleInputChange(); }}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Blood Group"
        value={bloodGroup}
        onChangeText={(text) => { setBloodGroup(text); handleInputChange(); }}
      />

      <TextInput
        style={styles.input}
        placeholder="Height (in cm)"
        value={height}
        onChangeText={(text) => { setHeight(text); handleInputChange(); }}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (in kg)"
        value={weight}
        onChangeText={(text) => { setWeight(text); handleInputChange(); }}
        keyboardType="numeric"
      />

      {/* Emergency Contacts */}
      {emergencyContacts.map((contact, index) => (
        <View key={index} style={styles.emergencyContactContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Emergency Contact ${index + 1}`}
            value={contact.number}
            onChangeText={(text) => {
              const updatedContacts = [...emergencyContacts];
              updatedContacts[index].number = text;
              setEmergencyContacts(updatedContacts);
              handleInputChange();
            }}
            keyboardType="phone-pad"
          />
          {index > 1 && (
            <TouchableOpacity onPress={() => removeEmergencyContact(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity onPress={addEmergencyContact} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Emergency Contact</Text>
      </TouchableOpacity>

      {/* Upload Photo Button */}
      <TouchableOpacity onPress={handlePhotoUpload} style={styles.photoButton}>
        <Text style={styles.photoButtonText}>Upload Photo</Text>
      </TouchableOpacity>

      {/* Display the selected photo */}
      {photo && <Image source={{ uri: photo }} style={styles.image} />}

    
      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: isButtonEnabled ? '#4CAF50' : '#D3D3D3' }]}
        onPress={handleSubmit}
        disabled={!isButtonEnabled}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#FFFFFF',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000000',
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
    photoButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
      alignItems: 'center',
    },
    photoButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    image: {
      width: width - 200,
      height: width - 200, // Ensure the height equals the width to maintain a circle
      borderRadius: (width - 40) / 2, // Half of the width to make it circular
      marginBottom: 15,
      alignSelf: 'center',
    },
    submitButton: {
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    submitButtonText: {
      color: 'gray',
      fontSize: 18,
      fontWeight: 'bold',
    },
    emergencyContactContainer: {
      marginBottom: 15,
    },
    addButton: {
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
      alignItems: 'center',
    },
    addButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    removeButton: {
      backgroundColor: '#FF6347',
      padding: 5,
      borderRadius: 5,
      marginTop: 5,
      alignItems: 'center',
    },
    removeButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
    },
  });
  
export default DaughterLogin;