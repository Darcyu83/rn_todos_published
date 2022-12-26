import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TBedTimeNavParams } from './branches/bedTime/types';
import { TTodosNavParams } from './branches/todos/types';
import { TUserNavParams } from './branches/user/types';

type TNavScrnParams_Todos = NavigatorScreenParams<TTodosNavParams>;
type TNavScrnParams_User = NavigatorScreenParams<TUserNavParams>;
type TNavScrnParams_Bedtime = NavigatorScreenParams<TBedTimeNavParams>;

export type TRootNavParamList = {
  todos: TNavScrnParams_Todos;
  auth: TNavScrnParams_User;
  user: TNavScrnParams_User;
  bedtime: TNavScrnParams_Bedtime;
};

export type TTabScrnProps_Root = BottomTabScreenProps<TRootNavParamList>;
export type TStackScrnProps_Todos = NativeStackScreenProps<TTodosNavParams>;
export type TStackScrnProps_User = NativeStackScreenProps<TUserNavParams>;

// =======================================================================

// 드로우어 네비게이션
export type TDrawerNavParamList = {
  home: TNavScrnParams_Todos;
  any: undefined;
};
