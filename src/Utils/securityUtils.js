import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const savePIN = async (pin) => {
  await Keychain.setGenericPassword('user', pin);
};

export const getPIN = async () => {
  const credentials = await Keychain.getGenericPassword();
  return credentials ? credentials.password : null;
};

export const clearPIN = async () => {
  await Keychain.resetGenericPassword();
};

export const saveToStorage = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = async (key) => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
