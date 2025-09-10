import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = 'student' | 'postgraduate' | 'professional' | null;

interface UserContextType {
  userType: UserType;
  userName: string;
  setUserType: (type: UserType) => void;
  setUserName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [userName, setUserName] = useState('');

  return (
    <UserContext.Provider value={{ userType, userName, setUserType, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const getUserTypeLabel = (type: UserType): string => {
  switch (type) {
    case 'student':
      return 'Học sinh (Lớp 8-12)';
    case 'postgraduate':
      return 'Sau đại học';
    case 'professional':
      return 'Chuyên gia đang làm việc';
    default:
      return '';
  }
};

export const getPersonalizedGreeting = (type: UserType): string => {
  switch (type) {
    case 'student':
      return 'Chào mừng, Học sinh tương lai!';
    case 'postgraduate':
      return 'Chào mừng, Chuyên gia tương lai!';
    case 'professional':
      return 'Chào mừng, Người thay đổi nghề nghiệp!';
    default:
      return 'Chào mừng bạn đến với Cổng Hướng nghiệp!';
  }
};