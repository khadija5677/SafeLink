import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
} from "react-native";

import { colors } from "../Utils/colors";

function ChoicePage() {
  return (
    // Full-screen doodle background
    <ImageBackground
      source={require("../../assests/images/doodle.png")} // Replace with your doodle image path
      style={styles.background}
      resizeMode="repeat"
    >
    <View style={styles.container}>
      {/* Content */}
      <Text style={styles.infoText}>
        Welcome! This is an example of how we use colors from the colors.js file.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Button clicked!")}
      >
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>
      </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor:"white",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  background: {
    flex: 1, // Full-screen coverage
    backgroundColor: "#f5f5f5", // Solid fallback background color
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    color: colors.text, // Replace with colors.text if using colors.js
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.buttonPrimary, // Replace with colors.buttonPrimary
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "blue", // Replace with colors.border
  },
  buttonText: {
    color: colors.buttonPrimaryText, // Replace with colors.buttonPrimaryText
    fontSize: 16,
    textAlign: "center",
  },
});

export default ChoicePage;
