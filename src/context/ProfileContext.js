import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    address: '',
    email: '',
    yourContact: '',
    age: '',
    photo: '',
    emergencyContacts: [{ number: '' }, { number: '' }],
  });

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};
