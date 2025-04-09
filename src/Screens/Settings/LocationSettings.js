import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const LocationSettings = () => {
  const navigation = useNavigation();

  const [liveLocation, setLiveLocation] = useState(false);
  const [locationFrequency, setLocationFrequency] = useState('5');
  const [safeZones, setSafeZones] = useState(['Home', 'School', 'Zone 3']);
  const [newZone, setNewZone] = useState('');
  const [autoCheckIn, setAutoCheckIn] = useState(false);

  const addSafeZone = () => {
    if (newZone.trim()) {
      setSafeZones([...safeZones, newZone.trim()]);
      setNewZone('');
    }
  };

  const removeSafeZone = (index) => {
    const updatedZones = [...safeZones];
    updatedZones.splice(index, 1);
    setSafeZones(updatedZones);
  };

  return (
    <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.container}>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('DaughterDashboard')}
      >
        <Icon name="home" size={24} color="#6A0DAD" />
      </TouchableOpacity>

      <Text style={styles.title}>Location Settings</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.settingsBlock}>
          <View style={styles.settingRow}>
            <Text style={styles.label}>Live Location Tracking</Text>
            <Switch
              value={liveLocation}
              onValueChange={setLiveLocation}
            />
          </View>

          <Text style={styles.label}>Location Update Frequency (in mins)</Text>
          <TextInput
            value={locationFrequency}
            onChangeText={setLocationFrequency}
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Safe Zones</Text>
          {safeZones.map((zone, index) => (
            <View key={index} style={styles.safeZoneContainer}>
              <TextInput value={zone} editable={false} style={styles.zoneInput} />
              <TouchableOpacity onPress={() => removeSafeZone(index)}>
                <Icon name="x" size={20} color="#6A0DAD" />
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.safeZoneContainer}>
            <TextInput
              placeholder="Enter new safe zone"
              value={newZone}
              onChangeText={setNewZone}
              style={styles.zoneInput}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setNewZone('')}>
              <Icon name="x" size={20} color="#6A0DAD" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addSafeZone}>
            <Text style={styles.buttonText}>Add Safe Zone</Text>
          </TouchableOpacity>

          <View style={styles.settingRow}>
            <Text style={styles.label}>Auto Check-In</Text>
            <Switch
              value={autoCheckIn}
              onValueChange={setAutoCheckIn}
            />
          </View>

          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.buttonText}>Share My Location Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsBlock: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B030B0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: '#000',
  },
  safeZoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#B030B0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  zoneInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#000',
    borderWidth: 0,
  },
  addButton: {
    backgroundColor: '#6A0DAD',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 15,
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#6A0DAD',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LocationSettings;