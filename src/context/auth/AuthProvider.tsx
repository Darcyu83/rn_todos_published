import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, {
  Children,
  createContext,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Alert, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setUserInfo } from '../../redux/user/userSlice';
import { AuthContextState } from './types';

interface IProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextState | null>(null);

function AuthProvider({ children }: IProps) {
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const dispatchUserInfo = useCallback(
    (userId: string, userToken: string) => {
      dispatch(setUserInfo({ userId, userToken }));
    },
    [dispatch]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { user: _user } = await auth().signInWithEmailAndPassword(
          email,
          password
        );
        Alert.alert(
          'signInWithEmailAndPassword success :: ',
          ` ${_user?.email}`
        );

        if (!_user || !_user.email) return;

        const userToken = await _user.getIdToken();
        dispatchUserInfo(_user.email, userToken);
      } catch (error) {
        console.log('Sing in Failed :: ', error);
      }
    },
    [dispatchUserInfo]
  );

  const register = useCallback(
    async (email: string, password: string) => {
      try {
        const { user: _user } = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
        Alert.alert(
          'createUserWithEmailAndPassword success :: ',
          ` ${_user?.email}`
        );

        if (!_user || !_user.email) return;

        const userToken = await _user.getIdToken();

        dispatchUserInfo(_user.email, userToken);
      } catch (error) {
        console.log('Sing up Failed :: ', error);
      }
    },
    [dispatchUserInfo]
  );

  const logout = useCallback(async () => {
    try {
      await auth().signOut();
      console.log('Logout success :: ');
    } catch (error) {
      console.log('Sing out Failed :: ', error);
    }
  }, []);

  const authContextValues = useMemo(
    () => ({ user, login, register, logout }),
    [user, login, register, logout]
  );
  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
