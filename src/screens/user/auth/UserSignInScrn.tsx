import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import InlineTextButton from '../../../components/bottons/InlineTextButton';
import useAuthContext from '../../../context/auth/hooks/useAuthContext';
import { TUserNavParams } from '../../../navigator/branches/user/types';

import { AppStyles } from '../../../styles/appStyles';

const ToggleThemeView = styled.View`
  background-color: ${(props) => props.theme.content_bg_primary};
  height: 60px;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface IProps {}

function UserSignInScrn({
  navigation,
}: {
  navigation: NativeStackNavigationProp<TUserNavParams>;
}) {
  const { login } = useAuthContext();
  const [email, setEmail] = useState('123456@test.com');
  const [userPw, setUserPw] = useState('123456');

  return (
    <ImageBackground
      source={require('../../../assets/backgroundImg/bg_coffee.jpg')}
      style={AppStyles.container}
    >
      {/* 키보드 */}
      <KeyboardAvoidingView
        style={AppStyles.backgroundCover}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={60}
      >
        <Text style={[AppStyles.lightText, AppStyles.header]}>Login</Text>
        {/* 아이디 */}
        <TextInput
          style={[
            AppStyles.textInput,
            AppStyles.lightText,
            AppStyles.lightTextInput,
          ]}
          value={email}
          onChangeText={setEmail}
          placeholder={`Username ${email}`}
          placeholderTextColor="#bebebe"
        />

        {/* 비밀번호 */}
        <TextInput
          style={[
            AppStyles.textInput,
            AppStyles.lightText,
            AppStyles.lightTextInput,
          ]}
          value={userPw}
          onChangeText={setUserPw}
          placeholder={`Password ${userPw}`}
          placeholderTextColor="#bebebe"
          secureTextEntry
        />

        {/* Sign Up 버튼 */}
        <View style={[AppStyles.rowContainer]}>
          <Text style={[AppStyles.lightText]}>Don`t have an account?</Text>
          <InlineTextButton
            title="Sign Up"
            onPress={() => {
              navigation.navigate('UserSignUpScrn');
            }}
          />
        </View>

        {/* Forgotten password 버튼 */}
        <View style={[AppStyles.rowContainer]}>
          <Text style={[AppStyles.lightText]}>Forgotten your password? </Text>
          <InlineTextButton
            title="Reset"
            onPress={() => {
              navigation.navigate('UserResetPwScrn');
            }}
          />
        </View>

        {/* Login 버튼 */}
        <Button
          title="Login"
          color="#ffd966"
          onPress={() => login(email, userPw)}
        />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default UserSignInScrn;
