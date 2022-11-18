import { useHeaderHeight } from '@react-navigation/elements';
import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaCustomized } from '../../styles/styledComponents/components';

interface IProps {
  children: ReactNode;
}

function SafeLinearAreaHOC({ children }: IProps) {
  const HEADER_HEIGHT = useHeaderHeight();
  return (
    <SafeAreaCustomized style={{}}>
      <LinearGradient
        style={{ flex: 1, paddingTop: HEADER_HEIGHT }}
        // colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.4)']}
        colors={['#5d5aa5', '#4d4a95']}
      >
        {children}
      </LinearGradient>
    </SafeAreaCustomized>
  );
}

export default SafeLinearAreaHOC;
