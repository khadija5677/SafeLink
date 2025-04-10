import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Switch, TextInput, Alert, ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {
  savePIN, getPIN, saveToStorage, getFromStorage
} from '../../Utils/securityUtils';

const SecuritySettingsScreen = () => {
  const navigation = useNavigation();

  const [pin, setPin] = useState('');
  const [enteredPin, setEnteredPin] = useState('');
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [lockOnBackground, setLockOnBackground] = useState(false);
  const [autoLockTimeout, setAutoLockTimeout] = useState('');
  const [panicMode, setPanicMode] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      setBiometricEnabled(await getFromStorage('biometricEnabled') || false);
      setLockOnBackground(await getFromStorage('lockOnBackground') || false);
      setAutoLockTimeout(await getFromStorage('autoLockTimeout') || '');
      setPanicMode(await getFromStorage('panicMode') || false);
    };
    loadSettings();
  }, []);

  const handleSavePin = async () => {
    if (pin.length < 4) return Alert.alert('PIN must be at least 4 digits.');
    await savePIN(pin);
    Alert.alert('PIN Saved Successfully');
    setPin('');
  };

  const validateEnteredPin = async () => {
    const savedPin = await getPIN();
    Alert.alert(savedPin === enteredPin ? 'PIN Correct' : 'Incorrect PIN');
    setEnteredPin('');
  };

  const toggleSetting = async (key, valueSetter, value) => {
    valueSetter(value);
    await saveToStorage(key, value);
  };

  return (
    <LinearGradient colors={['#E6E6FA', '#BA55D3']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Home Icon */}
        <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('DaughterDashboard')}>
          <Icon name="home" size={24} color="#6A0DAD" />
        </TouchableOpacity>

        <Text style={styles.title}>Security Settings</Text>

        {/* Change PIN */}
        <Text style={styles.label}>Set New PIN</Text>
        <TextInput
          value={pin}
          onChangeText={setPin}
          placeholder="Enter 4-digit PIN"
          style={styles.input}
          keyboardType="numeric"
          secureTextEntry
        />
        <TouchableOpacity onPress={handleSavePin} style={styles.button}>
          <Text style={styles.buttonText}>Save PIN</Text>
        </TouchableOpacity>

        {/* Validate PIN */}
        <Text style={styles.label}>Validate PIN</Text>
        <TextInput
          value={enteredPin}
          onChangeText={setEnteredPin}
          placeholder="Re-enter PIN"
          style={styles.input}
          keyboardType="numeric"
          secureTextEntry
        />
        <TouchableOpacity onPress={validateEnteredPin} style={styles.button}>
          <Text style={styles.buttonText}>Validate</Text>
        </TouchableOpacity>

        {/* Biometric Authentication */}
        <View style={styles.row}>
          <Text style={styles.label}>Enable Biometric</Text>
          <Switch
            value={biometricEnabled}
            onValueChange={(val) => toggleSetting('biometricEnabled', setBiometricEnabled, val)}
          />
        </View>

        {/* Lock on Background */}
        <View style={styles.row}>
          <Text style={styles.label}>Lock App on Background</Text>
          <Switch
            value={lockOnBackground}
            onValueChange={(val) => toggleSetting('lockOnBackground', setLockOnBackground, val)}
          />
        </View>

        {/* Auto Lock Timeout */}
        <Text style={styles.label}>Auto Lock Timeout (sec)</Text>
        <TextInput
          value={autoLockTimeout}
          onChangeText={(text) => toggleSetting('autoLockTimeout', setAutoLockTimeout, text)}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Panic Mode */}
        <View style={styles.row}>
          <Text style={styles.label}>Enable Panic Mode</Text>
          <Switch
            value={panicMode}
            onValueChange={(val) => toggleSetting('panicMode', setPanicMode, val)}
          />
        </View>

        {/* More settings like Security Questions, Intrusion Detection can be added here */}
      </ScrollView>
    </LinearGradient>
  );
};

export default SecuritySettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20 },
  homeIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4B0082',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6A5ACD',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
