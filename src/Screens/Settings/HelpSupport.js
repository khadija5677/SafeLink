import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const HelpSupportScreen = () => {
  const navigation = useNavigation();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I update my emergency contacts?',
      answer: 'Go to Settings > Emergency Contacts to add, edit, or remove them.',
    },
    {
      question: 'How do I check in with my family?',
      answer: 'Tap on the "Check In" button on the dashboard. It will notify your family of your location.',
    },
    {
      question: 'How do I update my location?',
      answer: 'Use the "Update Location" button on the dashboard to manually send your current location.',
    },
    {
      question: 'How can I reset my PIN?',
      answer: 'Navigate to Settings > Security Settings > Change PIN to reset your security PIN.',
    },
    {
      question: 'Why is my location not updating?',
      answer: 'Ensure you have granted location permissions and enabled GPS on your device.',
    },
    {
      question: 'How do I logout from the app?',
      answer: 'Go to the side menu > Logout option. You will be redirected to the login screen.',
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'You can email us at support@safetyapp.com');
  };

  const handleReportProblem = () => {
    Alert.alert('Report a Problem', 'Problem report submitted. Our team will review it shortly.');
  };

  const handleRequestCallback = () => {
    Alert.alert('Request a Callback', 'A support representative will contact you soon.');
  };

  return (
    <LinearGradient
      colors={['#EEDCFF', '#D0A3FF', '#B37DFF']}
      style={styles.container}
    >
      {/* Home Icon */}
      <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('DaughterDashboard')}>
        <Icon name="home" size={24} color="#6A0DAD" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Help & Support</Text>

        {/* FAQs */}
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.faqHeader}>
              <Text style={styles.question}>{faq.question}</Text>
              <Icon name={expandedIndex === index ? 'chevron-up' : 'chevron-down'} size={20} color="#6A0DAD" />
            </TouchableOpacity>
            {expandedIndex === index && <Text style={styles.answer}>{faq.answer}</Text>}
          </View>
        ))}

        {/* Support Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={handleContactSupport}>
            <Text style={styles.buttonText}>Contact Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleReportProblem}>
            <Text style={styles.buttonText}>Report a Problem</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleRequestCallback}>
            <Text style={styles.buttonText}>Request a Callback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default HelpSupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  
  scrollContainer: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5E17EB',
    marginBottom: 20,
    textAlign: 'center',
  },
  faqContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 3,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  answer: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  buttonGroup: {
    marginTop: 30,
  },
  button: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 14,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
