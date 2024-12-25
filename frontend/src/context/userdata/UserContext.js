import React, { createContext, useState, useContext } from 'react';

// Create a context for user data
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component to wrap the app and provide user data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Initial user state is null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
