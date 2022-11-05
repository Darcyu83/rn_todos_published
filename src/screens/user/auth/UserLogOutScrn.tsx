import React from 'react';
import { Button, Text, View } from 'react-native';
import useAuthContext from '../../../context/auth/hooks/useAuthContext';
import { persistor } from '../../../redux/store';

interface IProps {}

const UserLogOutScrn = ({}: IProps) => {
  const { logout } = useAuthContext();
  const onPurgePersistedState = async () => {
    await persistor.purge();
  };
  return (
    <View style={{}}>
      <Button
        title="Log Out"
        onPress={async () => {
          await onPurgePersistedState();
          await logout();
        }}
      />
    </View>
  );
};

export default UserLogOutScrn;
