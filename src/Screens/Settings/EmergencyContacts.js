import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { ProfileContext } from '../../context/ProfileContext';
import { useNavigation } from '@react-navigation/native';

const EmergencyContacts = () => {
  const navigation = useNavigation();
  const { profileData, setProfileData } = useContext(ProfileContext);
  const [isEditing, setIsEditing] = useState(false);

  const [emergencyContacts, setEmergencyContacts] = useState(
    profileData?.emergencyContacts || [
      { id: 1, number: '' },
      { id: 2, number: '' },
    ]
  );

  const handleContactChange = (index, value) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts[index].number = value;
    setEmergencyContacts(updatedContacts);
  };

  const addContact = () => {
    setEmergencyContacts([...emergencyContacts, { id: Date.now(), number: '' }]);
  };

  const removeContact = id => {
    if (emergencyContacts.length > 2) {
      setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
    }
  };

  const handleSave = () => {
    setProfileData({ ...profileData, emergencyContacts });
    setIsEditing(false);
    Alert.alert('Success', 'Emergency contacts updated.');
  };

  return (
    <LinearGradient colors={['#E6E6FA', '#BA55D3']} style={styles.container}>
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('DaughterDashboard')}>
        <Icon name="home" size={24} color="#6A0DAD" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Emergency Contacts</Text>

        {emergencyContacts.map((contact, index) => (
          <View key={contact.id} style={styles.contactRow}>
            <TextInput
              label={`Contact ${index + 1}`}
              value={contact.number}
              onChangeText={value => handleContactChange(index, value)}
              style={styles.input}
              keyboardType="phone-pad"
              editable={isEditing}
            />
            {isEditing && index >= 2 && (
              <TouchableOpacity onPress={() => removeContact(contact.id)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {isEditing ? (
          <>
            <Button mode="contained" onPress={addContact} style={styles.button}>Add Contact</Button>
            <Button mode="contained" onPress={handleSave} style={styles.button}>Save</Button>
            <Button mode="outlined" onPress={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</Button>
          </>
        ) : (
          <Button mode="contained" onPress={() => setIsEditing(true)} style={styles.button}>Edit</Button>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#6A5ACD', textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 15, backgroundColor: 'white' },
  button: { marginTop: 10, backgroundColor: '#6A5ACD' },
  cancelButton: { marginTop: 10, borderColor: '#6A5ACD', borderWidth: 1 },
  removeButton: { fontSize: 16, color: 'red', textAlign: 'right' },
  contactRow: { marginBottom: 10 },
  homeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: '#BA55D3',
    borderRadius: 20,
    padding: 6,
  },
});

export default EmergencyContacts;