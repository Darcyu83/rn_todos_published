import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootBtnNav from './RootBtnNav';
import {
  TRootNavParamsList,
  TStackScrnProps_Todos,
  TStackScrnProps_User,
  TTabScrnProps_Root,
} from './types';

export const useTabNavigation = () =>
  useNavigation<TTabScrnProps_Root['navigation']>();

export const useTodosNavigation = () =>
  useNavigation<TStackScrnProps_Todos['navigation']>();

export const useUserNavigation = () =>
  useNavigation<TStackScrnProps_User['navigation']>();
