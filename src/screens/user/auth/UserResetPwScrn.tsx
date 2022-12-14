import React, { useState } from 'react';
import {
  Alert,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootNavParamsList } from '../../../navigator/types';
import { AppStyles } from '../../../styles/appStyles';
import InlineTextButton from '../../../components/bottons/InlineTextButton';
import useAuthContext from '../../../context/auth/hooks/useAuthContext';

interface IProps {
  navigation: NativeStackNavigationProp<TRootNavParamsList>;
}

function UserResetPwScrn({ navigation }: IProps) {
  const [email, setEmail] = useState('');
  const [validationMsg, setValidationMsg] = useState('');

  const { sendMailToResetPwd } = useAuthContext();

  const onClickToReset = async (_email: string) => {
    await sendMailToResetPwd(_email);
  };
  return (
    <ImageBackground
      style={[AppStyles.container]}
      source={require('../../../assets/backgroundImg/bg_coffee.jpg')}
    >
      <KeyboardAvoidingView
        style={[AppStyles.backgroundCover]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* title */}
        <Text style={[AppStyles.lightText, AppStyles.header]}>
          Reset Passwrord
        </Text>

        {/* info validation message  */}
        <Text style={[AppStyles.errText]}>{validationMsg}</Text>
        {/* 아이디 */}
        <TextInput
          style={[
            AppStyles.textInput,
            AppStyles.lightText,
            AppStyles.lightTextInput,
          ]}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#bebebe"
        />

        {/* Login 버튼 */}
        <View style={[AppStyles.rowContainer]}>
          <Text style={[AppStyles.lightText]}>Already have an account? </Text>
          <InlineTextButton
            title="Login"
            onPress={() => {
              navigation.popToTop();
            }}
          />
        </View>

        {/* Reset 버튼 */}
        <Button
          onPress={() => onClickToReset(email)}
          title="Reset Password"
          color="#ffd966"
        />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default UserResetPwScrn;
