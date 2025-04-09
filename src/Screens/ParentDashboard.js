import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ParentDashboard = ({ navigation }) => {
  const [childLocation, setChildLocation] = useState({
      latitude: 28.6139,  // New Delhi Latitude
      longitude: 77.2090, // New Delhi Longitude
  });
  const [childName, setChildName] = useState('Child');
  const [batteryStatus, setBatteryStatus] = useState(85);
  const [sosAlert, setSosAlert] = useState(true);

  return (
    <View style={styles.container}>
      {/* Interactive Map */}
      <MapView
        provider={MapView.PROVIDER_GOOGLE} // Use Google Maps
        style={styles.map}
        initialRegion={{
          latitude: childLocation.latitude,
          longitude: childLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        zoomEnabled
        scrollEnabled
      >
        <Marker coordinate={childLocation} title={`${childName}'s Location`} />
      </MapView>

      {/* Touch Blocker for Non-Interactive Areas */}
      <View style={styles.touchBlocker} pointerEvents="none" />

      {/* Overlay with Interactive UI */}
      <View style={styles.overlay}>
        {/* Top Section */}
        <View style={styles.topContent}>
          <Text style={styles.title}>{childName}'s Last Location</Text>
          {sosAlert && <Text style={styles.sosAlert}>⚠️ SOS Alert Received!</Text>}
          <Text style={styles.battery}>🔋 Battery Status: {batteryStatus}%</Text>
        </View>

        {/* Bottom Section (Cards) */}
        <View style={styles.bottomContent}>
          <TouchableOpacity style={styles.card} onPress={() => Alert.alert('Refreshing Location')}>
            <Text style={styles.cardText}>🔄 Refresh Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('TrustedContacts')}
          >
            <Text style={styles.cardText}>📞 Add Trusted Contacts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => Alert.alert('Geofence Set')}>
            <Text style={styles.cardText}>📍 Set Geofence</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => Alert.alert('Viewing Past Routes')}>
            <Text style={styles.cardText}>🛤 View Past Routes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Fullscreen interactive map
  },
  touchBlocker: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  topContent: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 10, 23, 0.8)', // Semi-transparent blue
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E3F2FD',
    textAlign: 'center',
  },
  battery: {
    fontSize: 16,
    color: '#BBDEFB',
    marginTop: 5,
  },
  sosAlert: {
    fontSize: 18,
    color: '#FF3D00',
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#0D47A1',
    width: '48%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ParentDashboard;
