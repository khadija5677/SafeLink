import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const ResponsiveText = ({ size, children }) => {
  return (
    <Text style={{ fontSize: RFPercentage(size) }}>
      {children}
    </Text>
  );
};

export default ResponsiveText;
