import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from '../AuthProvider';

interface IProps {}

const useAuthContext = () => {
  const state = useContext(AuthContext);

  if (!state) throw new Error('Cannot find AuthContextState');
  return state;
};

export default useAuthContext;
