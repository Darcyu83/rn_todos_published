export interface TUserInitialState {
  isLoading: boolean;
  isSignIn: boolean;
  info: TUserInfo;
}

export interface TUserInfo {
  userToken: string | null;
  userNm: string | null;
  userPw: string | null;
}
