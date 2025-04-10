import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const PERMISSION_KEY = 'app_permissions';

const AppPermissionsScreen = () => {
  const navigation = useNavigation();

  const [permissions, setPermissions] = useState({
    location: false,
    camera: false,
    microphone: false,
    storage: false,
    notifications: false,
  });

  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const stored = await AsyncStorage.getItem(PERMISSION_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') {
            setPermissions(parsed);
          }
        }
      } catch (err) {
        console.error('Failed to load permissions', err);
      }
    };
    loadPermissions();
  }, []);

  const togglePermission = async (key) => {
    const updated = { ...permissions, [key]: !permissions[key] };
    setPermissions(updated);
    try {
      await AsyncStorage.setItem(PERMISSION_KEY, JSON.stringify(updated));
    } catch (error) {
      Alert.alert('Error', 'Failed to save permission settings');
    }
  };

  return (
    <LinearGradient colors={['#E6E6FA', '#BA55D3']} style={styles.container}>
      {/* Home Icon */}
      <TouchableOpacity
        style={styles.homeIcon}
        onPress={() => navigation.navigate('DaughterDashboard')}
      >
        <Icon name="home" size={24} color="#6A0DAD" />
      </TouchableOpacity>

      <Text style={styles.title}>App Permissions</Text>

      <View style={styles.permissionBlock}>
        {Object.entries(permissions).map(([key, value]) => (
          <View key={key} style={styles.permissionRow}>
            <Text style={styles.label}>{capitalize(key)}</Text>
            <Switch
              value={value}
              onValueChange={() => togglePermission(key)}
              trackColor={{ false: '#ccc', true: '#6A0DAD' }}
              thumbColor={value ? '#fff' : '#888'}
            />
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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
    marginBottom: 30,
  },
  permissionBlock: {
    backgroundColor: '#ffffffaa',
    borderRadius: 10,
    padding: 20,
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    color: '#4B0082',
    fontWeight: '500',
  },
});

export default AppPermissionsScreen;
