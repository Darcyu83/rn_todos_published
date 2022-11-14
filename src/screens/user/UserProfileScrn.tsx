import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InlineTextButton from '../../components/bottons/InlineTextButton';
import { TUserNavParams } from '../../navigator/branches/user/types';
import { ScrnTitle } from '../../styles/styledComponents/components';

interface IProps {}

function UserProfileScrn({
  navigation,
}: NativeStackScreenProps<TUserNavParams>) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <ScrnTitle>UserProfileScrn</ScrnTitle>

      <InlineTextButton
        title="Go to logOut"
        onPress={() => {
          navigation.navigate('UserLogOutScrn');
        }}
      />
    </SafeAreaView>
  );
}

export default UserProfileScrn;
