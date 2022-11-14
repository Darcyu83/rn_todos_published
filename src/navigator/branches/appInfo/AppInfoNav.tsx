import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import AboutScrn from '../../../screens/appInfo/AboutScrn';
import HelpScrn from '../../../screens/appInfo/HelpScrn';
import { TAppInfoNavParams } from './types';

interface IProps {}
const Stack = createNativeStackNavigator<TAppInfoNavParams>();
function AppInfoNav({}: IProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HelpScrn" component={HelpScrn} />
      <Stack.Screen name="AboutScrn" component={AboutScrn} />
    </Stack.Navigator>
  );
}

export default AppInfoNav;
