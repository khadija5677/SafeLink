import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Dimensions, Alert, Image, ScrollView, Modal
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

const DaughterLogin = ({ navigation }) => {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [photo, setPhoto] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([{ id: 1, number: '' }]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    const isAllFieldsFilled =
      name.trim() !== '' &&
      fatherName.trim() !== '' &&
      address.trim() !== '' &&
      email.trim() !== '' &&
      bloodGroup.trim() !== '' &&
      photo !== null &&
      emergencyContacts.every(contact => contact.number.trim() !== '');

    setIsButtonEnabled(isAllFieldsFilled);
  }, [name, fatherName, address, email, bloodGroup, photo, emergencyContacts]);

  const handlePhotoSelection = () => {
    if (photo) {
      setModalVisible(true);
    } else {
      Alert.alert(
        'Choose an Option',
        'Select an option to upload a photo',
        [
          { text: 'Upload from Media', onPress: handlePhotoUpload },
          { text: 'Capture Photo', onPress: handleCapturePhoto },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  const handlePhotoUpload = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (!response.didCancel && !response.error) {
        setPhoto(response.assets[0].uri);
        setModalVisible(false);
      }
    });
  };

  const handleCapturePhoto = () => {
    launchCamera({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (!response.didCancel && !response.error) {
        setPhoto(response.assets[0].uri);
        setModalVisible(false);
      }
    });
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setModalVisible(false);
  };

  const handleAddEmergencyContact = () => {
    const newContact = { id: emergencyContacts.length + 1, number: '' };
    setEmergencyContacts([...emergencyContacts, newContact]);
  };

  const handleRemoveEmergencyContact = (id) => {
    const updatedContacts = emergencyContacts.filter(contact => contact.id !== id);
    setEmergencyContacts(updatedContacts);
  };

  const handleEmergencyContactChange = (id, number) => {
    const updatedContacts = emergencyContacts.map(contact => 
      contact.id === id ? { ...contact, number } : contact
    );
    setEmergencyContacts(updatedContacts);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Daughter Login</Text>

        <TouchableOpacity onPress={handlePhotoSelection}>
          <Image 
            source={photo ? { uri: photo } : require('../../assets/images/default-profile.png')} 
            style={styles.roundImage} 
            resizeMode="cover"
          />
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            {photo && (
              <Image source={{ uri: photo }} style={styles.fullImage} resizeMode="cover" />
            )}
            <View style={styles.optionCircles}>
              <TouchableOpacity onPress={handlePhotoUpload} style={styles.optionCircle}><Text style={styles.optionText}>📁</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleCapturePhoto} style={styles.optionCircle}><Text style={styles.optionText}>📷</Text></TouchableOpacity>
              {photo && <TouchableOpacity onPress={handleRemovePhoto} style={styles.optionCircle}><Text style={styles.optionText}>🗑️</Text></TouchableOpacity>}
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.optionCircle}><Text style={styles.optionText}>❌</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TextInput style={styles.input} placeholder="Name *" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Father's Name *" value={fatherName} onChangeText={setFatherName} />
        <TextInput style={styles.input} placeholder="Address *" value={address} onChangeText={setAddress} />
        <TextInput style={styles.input} placeholder="Email *" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Blood Group *" value={bloodGroup} onChangeText={setBloodGroup} />
        <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Height (in cm)" value={height} onChangeText={setHeight} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Weight (in kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />

        {emergencyContacts.map((contact, index) => (
          <View key={contact.id} style={styles.emergencyContactContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder={`Emergency Contact ${index + 1} *`}
              value={contact.number}
              onChangeText={(text) => handleEmergencyContactChange(contact.id, text)}
              keyboardType="phone-pad"
            />
            {emergencyContacts.length > 1 && (
              <TouchableOpacity onPress={() => handleRemoveEmergencyContact(contact.id)} style={styles.removeContactButton}>
                <Text style={styles.removeContactButtonText}>🗑️</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity onPress={handleAddEmergencyContact} style={styles.addContactButton}>
          <Text style={styles.addContactButtonText}>Add Emergency Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.submitButton, { opacity: isButtonEnabled ? 1 : 0.6 }]} 
          onPress={() => Alert.alert('Profile Updated')} 
          disabled={!isButtonEnabled}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6E6FA', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#6A5ACD', textAlign: 'center', marginBottom: 20 },
  roundImage: { width: 120, height: 120, borderRadius: 100, marginBottom: 20, alignSelf: 'center', borderColor: '#BA55D3', borderWidth: 2 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)' },
  fullImage: { width: width * 0.8, height: width * 0.8, borderRadius: width * 0.4 },
  optionCircles: { flexDirection: 'row', position: 'absolute', bottom: 20 },
  optionCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#BA55D3', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
  optionText: { color: '#FFF', fontSize: 24 },
  input: { 
    width: '100%', 
    height: 50, 
    backgroundColor: '#F8F0FF', // Light lavender background (neutral)
    borderRadius: 12, 
    paddingHorizontal: 15, 
    fontSize: 16, 
    marginBottom: 15, 
    borderColor: '#6A5ACD', // Lilac border
    borderWidth: 1 
  },
  emergencyContactContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  removeContactButton: { marginLeft: 10, padding: 10, backgroundColor: '#FF6347', borderRadius: 12 },
  removeContactButtonText: { color: '#FFF', fontSize: 18 },
  addContactButton: { width: '100%', padding: 15, borderRadius: 12, alignItems: 'center', backgroundColor: '#9370DB', marginBottom: 15 }, // Lilac button
  addContactButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  submitButton: { width: '100%', padding: 15, borderRadius: 12, alignItems: 'center', backgroundColor: '#6A5ACD' }, // Lilac submit button
  submitButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});

export default DaughterLogin;