import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { colors } from '../Utils/colors'; //path to colors.js

const TextInputComponent = () => {
  const [text, setText] = useState(''); // Basic state to hold text

  // Simplified text change handler to avoid unnecessary operations
  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter some text:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        placeholderTextColor={colors.textLight}
        onChangeText={handleTextChange} // Optimized to call a simple handler
        value={text}
      />
      <Text style={styles.output}>
        {text ? `You typed: ${text}` : 'Start typing to see your text here!'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.background, // Use colors.js for background
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.textDark, // Use colors.js for text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: colors.primary, // Primary color for border
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: colors.backgroundLight, // Light background for input
    fontSize: 16, // Fixed font size, no responsiveness
    color: colors.text, // Text color
    shadowColor: colors.textDark, // Shadow color for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  output: {
    fontSize: 18,
    color: colors.secondaryDark, // Accent color for output text
    fontWeight: '500',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default TextInputComponent;
