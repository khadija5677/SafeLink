import React, { useState } from 'react';
import {View,Text,TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SCREEN_WIDTH = Dimensions.get('window').width;

const DaughterDashboard = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-SCREEN_WIDTH))[0];

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -SCREEN_WIDTH : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(!menuVisible);
    });
  };

  const handleMenuPress = (route) => {
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(false);
      navigation.navigate(route);
    });
  };

  const handleSendAlert = () => {
    Alert.alert('Alert Sent!', 'Your emergency alert has been sent.');
  };

  const handleCheckIn = () => {
    Alert.alert('Check-In', 'You have checked in successfully.');
  };

  const handleUpdateLocation = () => {
    Alert.alert('Location Updated', 'Your location has been updated.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => {
            toggleMenu(); // close the settings menu
            navigation.replace('DaughterLogin'); // navigate to login screen
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Menu Icon */}
      <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
        <Icon name="menu" size={28} color="#333" />
      </TouchableOpacity>

      {/* Settings Slide-In Menu */}
      <Animated.View style={[styles.menuContainer, { left: slideAnim }]}>
        <Text style={styles.menuHeader}>Settings</Text>
        <TouchableOpacity onPress={() => handleMenuPress('Profile')}>
          <Text style={styles.menuItem}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenuPress('EmergencyContacts')}>
          <Text style={styles.menuItem}>Emergency Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenuPress('LocationSettings')}>
          <Text style={styles.menuItem}>Location Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenuPress('SoundVibration')}>
          <Text style={styles.menuItem}>Sound & Vibration</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenuPress('AppPermissions')}>
          <Text style={styles.menuItem}>App Permissions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenuPress('SecuritySettings')}>
          <Text style={styles.menuItem}>Security Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenuPress('HelpSupport')}>
          <Text style={styles.menuItem}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.menuItem}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>[ Live Map will appear here ]</Text>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={handleSendAlert}>
          <Text style={styles.buttonText}>Send Emergency Alert</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUpdateLocation}>
          <Text style={styles.buttonText}>Update Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCheckIn}>
          <Text style={styles.buttonText}>Check In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DaughterDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  menuIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 30, // increase this
    elevation: 10, // for Android
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: SCREEN_WIDTH * 0.75,
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal: 20,
    elevation: 5,
    zIndex: 20, // lower than menuIcon
  },
  menuHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4B0082',
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#333',
  },
  mapPlaceholder: {
    marginTop: 100,
    marginHorizontal: 20,
    height: 250,
    borderRadius: 12,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 16,
    color: '#555',
  },
  buttonGroup: {
    marginTop: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
