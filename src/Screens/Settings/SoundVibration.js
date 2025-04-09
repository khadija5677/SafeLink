// src/Screens/Settings/SoundVibration.js

import React, { useState } from 'react';
import {
  View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@miblanchard/react-native-slider';

const SoundVibration = () => {
  const navigation = useNavigation();

  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [alertVolume, setAlertVolume] = useState(50);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(false);
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);
  const [isSilentOverrideEnabled, setIsSilentOverrideEnabled] = useState(false);

  return (
    <LinearGradient
      colors={['#EEDCFF', '#D0A3FF', '#B37DFF']}
      style={styles.container}
    >
      <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('DaughterDashboard')}>
        <Icon name="home" size={24} color="#6A0DAD" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Sound & Vibration Settings</Text>

        <View style={styles.card}>
          <View style={styles.settingRow}>
            <Text style={styles.label}>Emergency Alert Sound</Text>
            <Switch value={isSoundEnabled} onValueChange={setIsSoundEnabled} />
          </View>

          <Text style={styles.label}>Alert Volume</Text>
          <Slider
            value={alertVolume}
            onValueChange={value => setAlertVolume(value)}
            minimumValue={0}
            maximumValue={100}
            step={1}
            minimumTrackTintColor="#8A2BE2"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#8A2BE2"
          />

          <View style={styles.settingRow}>
            <Text style={styles.label}>Vibration</Text>
            <Switch value={isVibrationEnabled} onValueChange={setIsVibrationEnabled} />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.label}>Repeat Alerts</Text>
            <Switch value={isRepeatEnabled} onValueChange={setIsRepeatEnabled} />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.label}>Silent Mode Override</Text>
            <Switch value={isSilentOverrideEnabled} onValueChange={setIsSilentOverrideEnabled} />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#D3A4FF',
    borderRadius: 10,
    padding: 6,
    zIndex: 1,
  },
  scrollContent: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5E17EB',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default SoundVibration;
