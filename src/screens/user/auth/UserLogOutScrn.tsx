import React from 'react';
import { Button, Text, View } from 'react-native';
import { persistor } from '../../../redux/store';

interface IProps {}

const UserLogOutScrn = ({}: IProps) => {
  const onPurgePersistedState = async () => {
    await persistor.purge();
  };
  return (
    <View style={{}}>
      <Button
        title="Log Out"
        onPress={async () => {
          await onPurgePersistedState();
        }}
      />
    </View>
  );
};

export default UserLogOutScrn;
