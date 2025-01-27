import React, { useState } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import LottieView from 'lottie-react-native';

// Screen dimensions
const { width, height } = Dimensions.get('window');

// Your Google Maps API Key
const GOOGLE_MAPS_API_KEY = 'AIzaSyAGUi5WrXDr5IKQOGWzGVcEvsH8SROW4-E'; // Replace with your actual API key

const MapComponent = () => {
  // State to hold the calculated distance
  const [distance, setDistance] = useState(null);

  // Starting point coordinates (Girl's location)
  const girlLocation = { latitude: 16.654019, longitude: 74.262056 };
  // Destination coordinates (Parent's location)
  const parentLocation = { latitude: 16.675008, longitude: 74.241077 };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width, height }}
        initialRegion={{
          latitude: (girlLocation.latitude + parentLocation.latitude) / 2,
          longitude: (girlLocation.longitude + parentLocation.longitude) / 2,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* Marker for the girl's location */}
        <Marker coordinate={girlLocation} title="Girl's Location">
          <LottieView
            source={require('../../assests/LottieJason/girl.json')} // Path to girl's Lottie animation
            autoPlay
            loop
            style={{ width: 50, height: 50 }} // Ensure proper size
          />
        </Marker>

        {/* Marker for the parent's location */}
        <Marker coordinate={parentLocation} title="Parent's Location">
          <LottieView
            source={require('../../assests/LottieJason/parent.json')} // Path to parent's Lottie animation
            autoPlay
            loop
            style={{ width: 50, height: 50 }} // Ensure proper size
          />
        </Marker>

        {/* MapViewDirections to show the route */}
        <MapViewDirections
          origin={girlLocation}
          destination={parentLocation}
          apikey={GOOGLE_MAPS_API_KEY} // Use the correct API key
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
      </MapView>

      {/* Display the distance */}
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
});

export default MapComponent;
