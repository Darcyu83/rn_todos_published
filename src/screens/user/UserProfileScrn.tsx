import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InlineTextButton from '../../components/bottons/InlineTextButton';
import SafeLinearAreaHOC from '../../components/layout/SafeLinearAreaHOC';
import { TUserNavParams } from '../../navigator/branches/user/types';
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
        <InlineTextButton
          title="Go to logOut"
          onPress={() => {
            navigation.navigate('UserLogOutScrn');
          }}
        />
      </View>
    </SafeLinearAreaHOC>
  );
}

export default UserProfileScrn;
