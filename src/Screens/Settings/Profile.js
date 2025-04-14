import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from '../../context/ProfileContext';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const Profile = () => {
  const navigation = useNavigation();
  const { profileData, setProfileData } = useContext(ProfileContext);
  const [editable, setEditable] = useState(false);
  const [localData, setLocalData] = useState(profileData);

  const handleInputChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (index, value) => {
    const updatedContacts = [...localData.emergencyContacts];
    updatedContacts[index].number = value;
    setLocalData(prev => ({ ...prev, emergencyContacts: updatedContacts }));
  };

  const handleSave = () => {
    setProfileData(localData);
    setEditable(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setLocalData(profileData);
    setEditable(false);
  };

  const selectImage = () => {
    Alert.alert('Profile Picture', 'Choose an option', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 0.8 }, response => {
      if (!response.didCancel && response.assets?.length) {
        handleInputChange('photo', response.assets[0].uri);
      }
    });
  };
  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (!response.didCancel && response.assets?.length) {
        handleInputChange('photo', response.assets[0].uri);
      }
    });
  };

  return (
    <LinearGradient colors={['#E6E6FA', '#BA55D3']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('DaughterDashboard')}>
          <Icon name="home" size={24} color="#6A0DAD" />
        </TouchableOpacity>

        <Text style={styles.title}>My Profile</Text>

        <TouchableOpacity onPress={editable ? selectImage : null}>
          <Image
            source={localData.photo ? { uri: localData.photo } : require('../../../assets/images/default-profile.png')}
            style={styles.image}
          />
        </TouchableOpacity>

        <TextInput
          label="Full Name"
          value={localData.name}
          onChangeText={text => handleInputChange('name', text)}
          style={styles.input}
          editable={editable}
        />
        <TextInput
          label="Address"
          value={localData.address}
          onChangeText={text => handleInputChange('address', text)}
          style={styles.input}
          editable={editable}
        />
        <TextInput
          label="Email"
          value={localData.email}
          onChangeText={text => handleInputChange('email', text)}
          style={styles.input}
          editable={editable}
        />
        <TextInput
          label="Your Contact"
          value={localData.yourContact}
          onChangeText={text => handleInputChange('yourContact', text)}
          style={styles.input}
          editable={editable}
          keyboardType="phone-pad"
        />
        <TextInput
          label="Age"
          value={localData.age}
          onChangeText={text => handleInputChange('age', text)}
          style={styles.input}
          editable={editable}
          keyboardType="number-pad"
        />

        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        {localData.emergencyContacts?.map((contact, index) => (
          <TextInput
            key={index}
            label={`Emergency Contact ${index + 1}`}
            value={contact.number}
            onChangeText={text => handleContactChange(index, text)}
            style={styles.input}
            editable={editable}
            keyboardType="phone-pad"
          />
        ))}

        {editable ? (
          <View style={styles.buttonRow}>
            <Button onPress={handleSave} mode="contained" style={styles.saveButton} labelStyle={styles.sameText}>
              Save
            </Button>
            <Button onPress={handleCancel} mode="contained" style={styles.cancelButton} labelStyle={styles.sameText}>
              Cancel
            </Button>
          </View>
        ) : (
          <Button onPress={() => setEditable(true)} mode="contained" style={styles.editButton}>
            Edit Profile
          </Button>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4B0082',
    marginBottom: 20,
  },
  homeIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#BA55D3',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#4B0082',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#6A5ACD',
    flex: 0.45,
  },
  cancelButton: {
    backgroundColor: '#6A5ACD',
    flex: 0.45,
  },
  editButton: {
    backgroundColor: '#6A5ACD',
    marginTop: 20,
  },
  sameText: {
    color: 'white',
  },
});

export default Profile;
