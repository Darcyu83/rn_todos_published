import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { TUserInfo, TUserInitialState } from './types';

const initialState: TUserInitialState = {
  isLoading: true,
  isSignIn: false,
  info: { userNm: null, userToken: null },
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
  // 초기화하고 싶은 state가 있는 slice마다 아래를 추가해야한다.
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setUserToken, setUserInfo } = useSlice.actions;
export const userReducer = useSlice.reducer;
