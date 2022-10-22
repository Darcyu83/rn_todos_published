import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserInfo, TUserInitialState } from './types';

const initialState: TUserInitialState = {
  isLoading: true,
  isSignIn: false,
  info: { userNm: null, userPw: null, userToken: null },
};
const useSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken(state, action: PayloadAction<string>) {
      state.info.userToken = action.payload;
    },
    setUserInfo(state, action: PayloadAction<TUserInfo>) {
      state.info = { ...state.info, ...action.payload };
    },
  },
});

export const { setUserToken, setUserInfo } = useSlice.actions;
export const userReducer = useSlice.reducer;
