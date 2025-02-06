import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, Platform, StyleSheet, Alert, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location for tracking.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true; // iOS handles permissions separately
};

const requestBackgroundLocationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 29) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      {
        title: "Background Location Permission",
        message: "This app needs background location access.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const LocationTracker = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [tracking, setTracking] = useState(false);

  const askForPermission = () => {
    Alert.alert(
      'Location Access',
      'This app needs access to your location to track your live location.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: handlePermissionRequest },
      ]
    );
  };

  const handlePermissionRequest = async () => {
    const hasForegroundPermission = await requestLocationPermission();
    if (hasForegroundPermission) {
      const hasBackgroundPermission = await requestBackgroundLocationPermission();
      if (hasBackgroundPermission) {
        setTracking(true);
        getCurrentLocation();
        startLocationTracking();
      } else {
        setError("Background location permission denied");
      }
    } else {
      setError("Location permission denied");
    }
  };

  const startLocationTracking = () => {
    const watcher = Geolocation.watchPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        setError(error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 10000,
        fastestInterval: 5000,
      }
    );
    return watcher;
  };

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        setError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  useEffect(() => {
    return () => {
      if (tracking) {
        Geolocation.stopObserving();
      }
    };
  }, [tracking]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Location Tracker</Text>
      {!tracking ? (
        <Button title="Allow Location Access" onPress={askForPermission} />
      ) : (
        <>
          {error && <Text style={styles.errorText}>Error: {error}</Text>}
          {location ? (
            <Text style={styles.locationText}>
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </Text>
          ) : (
            <Text style={styles.locationText}>Waiting for location...</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 18,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default LocationTracker;
