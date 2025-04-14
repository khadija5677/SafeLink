import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import LinearGradient from 'react-native-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

const DaughterDashboard = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-SCREEN_WIDTH * 0.8))[0];
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      position => setLocation(position.coords),
      error => Alert.alert('Error', 'Failed to get location'),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const toggleMenu = () => {
    const toValue = menuVisible ? -SCREEN_WIDTH * 0.8 : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(!menuVisible);
    });
  };

  const navigateAndClose = (screen) => {
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH * 0.8,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(false);
      navigation.navigate(screen);
    });
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => navigation.replace('DaughterLogin') }
    ]);
  };

  const handleSendAlert = () => Alert.alert('Alert Sent!');
  const handleUpdateLocation = () => { getCurrentLocation(); Alert.alert('Location Updated'); };
  const handleCheckIn = () => Alert.alert('Checked In');

  return (
    <View style={{flex:1}}>
    <LinearGradient colors={['#E6E6FA', '#BA55D3']} style={styles.gradientContainer}>
      {/* Hamburger Icon */}
      <TouchableOpacity style={styles.hamburger} onPress={toggleMenu}>
        <Icon name={menuVisible ? 'x' : 'menu'} size={26} color="#fff" />
      </TouchableOpacity>

      {/* Dark overlay */}
      {menuVisible && <TouchableOpacity style={styles.overlay} onPress={toggleMenu} activeOpacity={1} />}

      {/* Slide-in Menu */}
      <Animated.View style={[styles.menu, { left: slideAnim }]}>
        <Text style={styles.menuTitle}>Settings</Text>
        {[ 
          { label: 'Profile', screen: 'Profile' },
          { label: 'Emergency Contacts', screen: 'EmergencyContacts' },
          { label: 'Location Settings', screen: 'LocationSettings' },
          { label: 'App Permissions', screen: 'AppPermissions' },
          { label: 'Security Settings', screen: 'SecuritySettings' },
          { label: 'Help & Support', screen: 'HelpSupport' },
          { label: 'Logout', screen: 'DaughterLogin', logout: true },
        ].map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.menuItem}
            onPress={() => item.logout ? handleLogout() : navigateAndClose(item.screen)}
          >
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* Map */}
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={StyleSheet.absoluteFillObject}
            showsUserLocation={true}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location} title="You" pinColor="purple" />
          </MapView>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Loading Location...</Text>
          </View>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonArea}>
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
    </LinearGradient>
    </View>
  );
};

export default DaughterDashboard;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  hamburger: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 30,
    backgroundColor: '#6A5ACD',
    padding: 10,
    borderRadius: 30,
    elevation: 4,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
  menu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal: 20,
    zIndex: 20,
    elevation: 5,
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 20,
    alignSelf: 'center',
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 17,
    color: '#333', 
  },
  mapContainer: {
    flex: 1,
   // marginTop: 85,
   // marginHorizontal: 12,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#555', 
  },
  buttonArea: {
    // paddingBottom: 20,
    // paddingBottom: 30,
    position:"absolute",
      bottom:0,
      margin:20,
      width:"90%"
  },
  button: {
    backgroundColor: '#6A5ACD',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: '600',
  },
});
