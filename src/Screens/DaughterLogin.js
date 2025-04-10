import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TextInput, Button } from 'react-native-paper';
import { ProfileContext } from '../context/ProfileContext';

const { width } = Dimensions.get('window');

const DaughterLogin = ({ navigation }) => {
  const { setProfileData } = useContext(ProfileContext);

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    yourContact: '',
    age: '',
    photo: null,
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, number: '' },
    { id: 2, number: '' },
  ]);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const requiredFields = ['fullName', 'address', 'email', 'yourContact', 'age'];
    const isValid =
      requiredFields.every(key => formData[key]?.trim() !== '') &&
      emergencyContacts.every(contact => contact.number.trim() !== '');

    setIsButtonEnabled(isValid);
  }, [formData, emergencyContacts]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectImage = () => {
    Alert.alert('Select Profile Picture', 'Choose an option', [
      { text: 'Capture Photo', onPress: openCamera },
      { text: 'Upload from Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 0.8 }, response => {
      if (!response.didCancel && response.assets?.length > 0) {
        handleInputChange('photo', response.assets[0].uri);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (!response.didCancel && response.assets?.length > 0) {
        handleInputChange('photo', response.assets[0].uri);
      }
    });
  };

  const addEmergencyContact = () => {
    setEmergencyContacts(prev => [...prev, { id: Date.now(), number: '' }]);
  };

  const removeEmergencyContact = id => {
    if (emergencyContacts.length > 2) {
      setEmergencyContacts(prev => prev.filter(contact => contact.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!isButtonEnabled) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    const finalData = {
      name: formData.fullName,
      address: formData.address,
      email: formData.email,
      yourContact: formData.yourContact,
      age: formData.age,
      photo: formData.photo,
      emergencyContacts: emergencyContacts.map(c => ({ number: c.number })),
    };

    setProfileData(finalData); // Save to context
    navigation.navigate('DaughterDashboard');
  };

  return (
    <LinearGradient colors={['#E6E6FA', '#BA55D3']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Daughter Login</Text>

        <TouchableOpacity onPress={selectImage}>
          <Image
            source={
              formData.photo
                ? { uri: formData.photo }
                : require('../../assets/images/default-profile.png')
            }
            style={styles.roundImage}
          />
        </TouchableOpacity>

        <TextInput
          label="Full Name *"
          value={formData.fullName}
          onChangeText={text => handleInputChange('fullName', text)}
          style={styles.input}
        />

        <TextInput
          label="Address *"
          value={formData.address}
          onChangeText={text => handleInputChange('address', text)}
          style={styles.input}
        />

        <TextInput
          label="Email *"
          value={formData.email}
          onChangeText={text => handleInputChange('email', text)}
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          label="Your Contact *"
          value={formData.yourContact}
          onChangeText={text => handleInputChange('yourContact', text)}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          label="Age *"
          value={formData.age}
          onChangeText={text => handleInputChange('age', text)}
          keyboardType="numeric"
          style={styles.input}
        />

        {emergencyContacts.map((contact, index) => (
          <View key={contact.id} style={styles.contactContainer}>
            <TextInput
              label={`Emergency Contact ${index + 1} *`}
              value={contact.number}
              onChangeText={text => {
                const updated = [...emergencyContacts];
                updated[index].number = text;
                setEmergencyContacts(updated);
              }}
              keyboardType="phone-pad"
              style={styles.input}
            />
            {index >= 2 && (
              <TouchableOpacity onPress={() => removeEmergencyContact(contact.id)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <Button mode="contained" onPress={addEmergencyContact} style={styles.addButton}>
          Add Contact
        </Button>

        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!isButtonEnabled}
          style={styles.submitButton}
        >
          Submit
        </Button>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A5ACD',
    textAlign: 'center',
    marginBottom: 20,
  },
  roundImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#BA55D3',
    marginBottom: 20,
  },
  input: { marginBottom: 15, backgroundColor: 'white' },
  contactContainer: { marginBottom: 10 },
  removeButton: { fontSize: 16, color: 'red', marginTop: -10 },
  addButton: { marginVertical: 10, backgroundColor: '#6A5ACD' },
  submitButton: { marginTop: 10, backgroundColor: '#6A5ACD' },
});

export default DaughterLogin;
