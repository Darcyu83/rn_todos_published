import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, View } from 'react-native';

import SafeLinearAreaHOC from '../../components/layout/SafeLinearAreaHOC';
import { TUserNavParams } from '../../navigator/branches/user/types';
import SplashScrn from '../../assets/splash/SplashScrn';
import InlineTextButton from '../../components/bottons/InlineTextButton';
import PangestureTest from '../../components/gesturehanlder/PangestureTest';
import { ScrnTitle } from '../../styles/styledComponents/components';

interface IProps {}

function UserProfileScrn({
  navigation,
}: NativeStackScreenProps<TUserNavParams>) {
  return (
    <SafeLinearAreaHOC>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffd966',
        }}
      >
        <ScrnTitle>User Profile Screen</ScrnTitle>
      </View>
      <Button
        title="Go to logOut"
        onPress={() => {
          navigation.navigate('UserLogOutScrn');
        }}
      />
      <PangestureTest />
    </SafeLinearAreaHOC>
  );
}

export default UserProfileScrn;
