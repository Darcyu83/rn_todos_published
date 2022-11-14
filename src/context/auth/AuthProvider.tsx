import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { Children, createContext, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setUserInfo } from '../../redux/user/userSlice';
import { AuthContextState } from './types';

interface IProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextState | null>(null);

function AuthProvider({ children }: IProps) {
  const [_user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const dispatchUserInfo = (userNm: string, userToken: string) => {
    dispatch(setUserInfo({ userNm, userToken }));
  };

  const login = async (email: string, password: string) => {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('signInWithEmailAndPassword success :: ', ` ${user?.email}`);

      if (!user || !user.email)
        return Alert.alert('USER EMAIL 없음 :: ', ` ${user?.email}`);

      setUser(user);
      const userToken = await user.getIdToken();
      dispatchUserInfo(user.email, userToken);
    } catch (error) {
      console.log('Sing in Failed :: ', error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      Alert.alert(
        'createUserWithEmailAndPassword success :: ',
        ` ${user?.email}`
      );

      if (!user || !user.email)
        return Alert.alert('USER EMAIL 없음 :: ', ` ${user?.email}`);

      setUser(user);

      const userToken = await user.getIdToken();

      dispatchUserInfo(user.email, userToken);
    } catch (error) {
      console.log('Sing up Failed :: ', error);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      console.log('Logout success :: ');
    } catch (error) {
      console.log('Sing out Failed :: ', error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user: _user, setUser, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
