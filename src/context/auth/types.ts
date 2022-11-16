import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type AuthContextState = {
  user: any;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
