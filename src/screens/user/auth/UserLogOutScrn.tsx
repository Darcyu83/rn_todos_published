import React from 'react';
import { Button, ImageBackground, Text, View } from 'react-native';
import useAuthContext from '../../../context/auth/hooks/useAuthContext';
import { persistor } from '../../../redux/store';
import { AppStyles } from '../../../styles/appStyles';

interface IProps {}

function UserLogOutScrn({}: IProps) {
  const { logout } = useAuthContext();
  const onPurgePersistedState = async () => {
    await persistor.purge();
  };
  return (
    <ImageBackground
      source={require('../../../assets/backgroundImg/bg_coffee.jpg')}
      style={AppStyles.container}
    >
      <Button
        title="Log Out"
        onPress={async () => {
          await onPurgePersistedState();
          await logout();
        }}
        color="#ffd966"
      />
    </ImageBackground>
  );
}

export default UserLogOutScrn;
