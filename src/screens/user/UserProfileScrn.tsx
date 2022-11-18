import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScrn from '../../assets/splash/SplashSVG';
import SvgWaveTest from '../../assets/splash/SvgWaveTest';
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
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
        <View
          style={{
            width: '50%',
            height: '40%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SplashScrn bgColor="#5d5aa5" />
        </View>
      </ScrollView>
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
