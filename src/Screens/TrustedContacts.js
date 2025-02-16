import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert ,Dimensions  } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const TrustedContacts = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const addContact = () => {
    if (name.trim() === '') {
      Alert.alert('Error', 'Please enter a name.');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      Alert.alert('Error', 'Phone number must be of 10 digits.');
      return;
    }
    setContacts([...contacts, { id: Date.now().toString(), name, phone }]);
    setName('');
    setPhone('');
  };

  const removeContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍👩‍👧‍👦 Trusted Contacts</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter 10-digit Phone Number"
        keyboardType="number-pad"
        maxLength={10}
        value={phone}
        onChangeText={setPhone}
      />

      {/* Add Contact Button */}
      <TouchableOpacity style={styles.addButton} onPress={addContact}>
        <Text style={styles.addButtonText}>➕ Add Contact</Text>
      </TouchableOpacity>

      {/* Contacts List */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() =>
              Alert.alert('Remove Contact', `Remove ${item.name}?`, [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Remove', onPress: () => removeContact(item.id) },
              ])
            }
          >
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactPhone}>{item.phone}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E3F2FD', // Light blue background
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#0D47A1', // Deep blue text
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#64B5F6', // Soft blue border
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#BBDEFB', // Light blue input
  },
  addButton: {
    backgroundColor: '#1976D2', // Primary blue
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%', // Full-width button
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactCard: {
    backgroundColor: '#42A5F5', // Card with medium blue
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    width: screenWidth * 0.9, // 90% of screen width (same as buttons)
    alignSelf: 'center', // Centers the card
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  contactName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactPhone: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#0D47A1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%', // Full-width button
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TrustedContacts;
