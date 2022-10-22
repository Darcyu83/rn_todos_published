import React from 'react';
import { View, Text } from 'react-native';

export const returnLoadingScrn = (isLoading: boolean) => {
  return (
    <View>
      <Text>Now Loading...</Text>
    </View>
  );
};
