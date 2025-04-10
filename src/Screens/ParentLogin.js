import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import LinearGradient from "react-native-linear-gradient";

// Replace with your actual local IP
const API_BASE_URL = "192.168.114.144:5000";  

const ParentLogin = ({ navigation }) => {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [email, setEmail] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const [errors, setErrors] = useState({});

  const [sentCode, setSentCode] = useState('');


  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !relation || !emailRegex.test(email) || contactDetails.length !== 10) {
      Alert.alert("Validation Error", "Please fill all fields correctly.");
      return false;
    }
    return true;
  };

  const sendVerificationCode = async () => {
    if (!validateFields()) return;
  
    try {
      const response = await fetch("http://192.168.114.144:5000/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contactDetails }),
      });
  
      const data = await response.json();
      console.log('Server Response:', data); // Debugging log in React Native
  
      if (response.ok) {
        setSentCode(data.code); // Save the code
        setIsCodeSent(true);
        Alert.alert("Verification Code Sent", `Your code is: ${data.code}`);
      } else {
        Alert.alert("Error", data.message || "Failed to send code");
      }
    } catch (error) {
      console.error("Network Error:", error);
      Alert.alert("Network Error", "Failed to connect to the server");
    }
  };
  

  const verifyCode = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enteredCode: verificationCode }),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert("Login Successful", "Welcome to the Parent Dashboard!");
        navigation.navigate("ParentDashboard");
      } else {
        Alert.alert("Invalid Code", "Please enter the correct verification code.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Verification failed. Please try again.");
    }
  };

  return (


    <LinearGradient colors={["#64B5F6", "#FF80AB"]} style={styles.container}>

      <View style={styles.overlay}>
        <Text style={styles.title}>Parent Login</Text>

        <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
        <View style={styles.pickerContainer}>
          <Picker selectedValue={relation} onValueChange={(itemValue) => setRelation(itemValue)}>
            <Picker.Item label="Select Relation" value="" />
            <Picker.Item label="Father" value="Father" />
            <Picker.Item label="Mother" value="Mother" />
            <Picker.Item label="Guardian" value="Guardian" />
          </Picker>
        </View>
        <TextInput style={styles.input} placeholder="Enter phone number" value={contactDetails} onChangeText={setContactDetails} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Enter email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

        <TouchableOpacity style={styles.button} onPress={sendVerificationCode}>
          <Text style={styles.buttonText}>Send Verification Code</Text>
        </TouchableOpacity>

        {isCodeSent && (
          <>
            <TextInput style={styles.input} placeholder="Enter verification code" value={verificationCode} onChangeText={setVerificationCode} keyboardType="numeric" />
            <TouchableOpacity style={styles.button} onPress={verifyCode}>
              <Text style={styles.buttonText}>Verify & Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0D47A1',
  },
  input: {
    height: 50,
    borderColor: '#90CAF9',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#0D47A1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(255, 255, 255, 0.55)", padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#0D47A1" },
  input: { height: 50, borderColor: "#90CAF9", borderWidth: 1, borderRadius: 8, marginBottom: 10, paddingLeft: 10, fontSize: 16, backgroundColor: "#FFFFFF" },
  pickerContainer: { borderWidth: 1, borderColor: "#90CAF9", borderRadius: 8, marginBottom: 10, backgroundColor: "#FFFFFF" },
  button: { backgroundColor: "#0D47A1", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },

});

export default ParentLogin;