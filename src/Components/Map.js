import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import LottieView from 'lottie-react-native';
import Geolocation from 'react-native-geolocation-service';

// Screen dimensions
const { width, height } = Dimensions.get('window');

// Your Google Maps API Key
const GOOGLE_MAPS_API_KEY = 'AIzaSyAGUi5WrXDr5IKQOGWzGVcEvsH8SROW4-E'; // Replace with your actual API key

const MapComponent = () => {
  const [distance, setDistance] = useState(null);
  const [girlLocation, setGirlLocation] = useState(null);
  const parentLocation = { latitude: 16.675008, longitude: 74.241077 };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    };

    const watchLiveLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        console.error("Location permission denied");
        return;
      }
      const watcher = Geolocation.watchPosition(
        (position) => {
          setGirlLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.error("Error fetching location:", error),
        { enableHighAccuracy: true, distanceFilter: 5, interval: 5000, fastestInterval: 2000 }
      );
      return () => Geolocation.clearWatch(watcher);
    };

    watchLiveLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width, height }}
        region={
          girlLocation && parentLocation
            ? {
                latitude: (girlLocation.latitude + parentLocation.latitude) / 2,
                longitude: (girlLocation.longitude + parentLocation.longitude) / 2,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }
            : undefined
        }
      >
        {girlLocation && (
          <Marker coordinate={girlLocation} title="Girl's Location">
            <View style={styles.lottieContainer}>
              <LottieView
                source={require('../../assets/LottieJason/girl.json')}
                autoPlay
                loop
                style={styles.lottieStyle}
              />
            </View>
          </Marker>
        )}

        <Marker coordinate={parentLocation} title="Parent's Location">
          <View style={styles.lottieContainer}>
            <LottieView
              source={require('../../assets/LottieJason/parent.json')}
              autoPlay
              loop
              style={styles.lottieStyle}
            />
          </View>
        </Marker>

        {girlLocation && (
          <MapViewDirections
            origin={girlLocation}
            destination={parentLocation}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="blue"
            onError={(errorMessage) => {
              console.error("Error with directions:", errorMessage);
            }}
            onReady={(result) => {
              console.log("Distance:", result.distance, "km");
              setDistance(result.distance);
            }}
          />
        )}
      </MapView>

      {distance !== null && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Distance: {distance.toFixed(2)} km
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    padding: 10,
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lottieContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieStyle: {
    width: 50,
    height: 50,
  },
});

export default MapComponent;
