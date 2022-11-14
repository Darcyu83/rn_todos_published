export interface TUserInitialState {
  isLoading: boolean;
  isSignIn: boolean;
  info: TUserInfo;
}

export interface TUserInfo {
  userToken: string | null;
  userId: string | null;
}
