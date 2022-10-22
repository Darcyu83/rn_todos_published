import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { useAppDispatch } from '../../../redux/hooks';
import { toggleDarkMode } from '../../../redux/theme/themeSlice';
import { setUserInfo, setUserToken } from '../../../redux/user/userSlice';
import { onToggleDarkMode } from '../../../utils/themeUtils';

const ToggleThemeView = styled.View`
  background-color: ${(props) => props.theme.content_bg_primary};
  height: 60px;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface IProps {}

const UserSignInScrn = ({}: IProps) => {
  const dispatch = useAppDispatch();
  const [userNm, setUserNm] = useState('');
  const [userPw, setUserPw] = useState('');

  const onSubmitHandler = () => {
    dispatch(setUserInfo({ userNm, userPw, userToken: 'temporary' }));
  };

  return (
    <View style={{}}>
      <TextInput
        placeholder="Input your name"
        value={userNm}
        onChangeText={setUserNm}
      />
      <TextInput
        placeholder="Input your password"
        value={userPw}
        onChangeText={setUserPw}
        secureTextEntry
      />
      <Button title="Sign in" onPress={onSubmitHandler} />
      <ToggleThemeView>
        <Button title="Toggle DarkMode" onPress={onToggleDarkMode} />
      </ToggleThemeView>
    </View>
  );
};

export default UserSignInScrn;
