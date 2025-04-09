import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TextInput, Button } from 'react-native-paper';
import { ProfileContext } from '../context/ProfileContext';

const { width } = Dimensions.get('window');

const DaughterLogin = ({ navigation }) => {
  const { setProfileData } = useContext(ProfileContext);

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    address: '',
    email: '',
    bloodGroup: '',
    yourContact: '',
    age: '',
    height: '',
    weight: '',
    photo: null,
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, number: '' },
    { id: 2, number: '' },
  ]);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const requiredFields = ['name', 'fatherName', 'address', 'email', 'bloodGroup', 'yourContact', 'photo'];
    const areRequiredFieldsFilled = requiredFields.every(field => {
      const value = formData[field];
      return value && value.toString().trim() !== '';
    });
  
    const areContactsFilled = emergencyContacts.every(contact => contact.number.trim() !== '');
  
    setIsButtonEnabled(areRequiredFieldsFilled && areContactsFilled);
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
      if (response.didCancel || !response.assets?.length) return;
      handleInputChange('photo', response.assets[0].uri);
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (response.didCancel || !response.assets?.length) return;
      handleInputChange('photo', response.assets[0].uri);
    });
  };

  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { id: Date.now(), number: '' }]);
  };

  const removeEmergencyContact = id => {
    if (emergencyContacts.length > 2) {
      setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!isButtonEnabled) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
  
    // ✅ Basic Email Format Validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
  
    // Save to global context
    setProfileData({ ...formData, emergencyContacts });
  
    Alert.alert('Success', 'Profile Updated Successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.replace('DaughterDashboard'),
      },
    ]);
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
                : require('../../assets/images/image.png')
            }
            style={styles.roundImage}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <TextInput label="Name *" value={formData.name} onChangeText={text => handleInputChange('name', text)} style={styles.input} />
        <TextInput label="Father's Name *" value={formData.fatherName} onChangeText={text => handleInputChange('fatherName', text)} style={styles.input} />
        <TextInput label="Address *" value={formData.address} onChangeText={text => handleInputChange('address', text)} style={styles.input} />
        <TextInput label="Email *" value={formData.email} onChangeText={text => handleInputChange('email', text)} keyboardType="email-address" autoCapitalize="none" style={styles.input} />
        <TextInput label="Blood Group *" value={formData.bloodGroup} onChangeText={text => handleInputChange('bloodGroup', text)} style={styles.input} />
        <TextInput label="Your Contact *" value={formData.yourContact} onChangeText={text => handleInputChange('yourContact', text)} keyboardType="phone-pad" style={styles.input} />
        <TextInput label="Age" value={formData.age} onChangeText={text => handleInputChange('age', text)} keyboardType="numeric" style={styles.input} />
        <TextInput label="Height (in cm)" value={formData.height} onChangeText={text => handleInputChange('height', text)} keyboardType="numeric" style={styles.input} />
        <TextInput label="Weight (in kg)" value={formData.weight} onChangeText={text => handleInputChange('weight', text)} keyboardType="numeric" style={styles.input} />

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

        <Button mode="contained" onPress={handleSubmit} disabled={!isButtonEnabled} style={styles.submitButton}>
          Submit
        </Button>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#6A5ACD', textAlign: 'center', marginBottom: 20 },
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
  removeButton: { fontSize: 16, color: 'red', textAlign: 'right' },
  addButton: { marginVertical: 10, backgroundColor: '#6A5ACD' },
  submitButton: { marginTop: 10, backgroundColor: '#6A5ACD' },
});

export default DaughterLogin;
