import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createGlobalStyle } from 'styled-components';
import { ICON_SIZE } from '../../styles/constants';

interface IProps {
  width?: number | string;
  height?: number | string;
}

const style = StyleSheet.create({
  icon: { width: ICON_SIZE, height: ICON_SIZE },
});

export const AddIcon = ({ width, height }: IProps) => {
  return (
    <View
      style={width && height ? { width: width, height: height } : style.icon}
    >
      <Image
        style={{ width: 45, height: 45 }}
        source={require('../../assets/icons/add-80.png')}
      />
    </View>
  );
};

export const EditIcon = ({ width, height }: IProps) => {
  return (
    <View
      style={width && height ? { width: width, height: height } : style.icon}
    >
      <Image
        style={{ width: 45, height: 45 }}
        source={require('../../assets/icons/edit-80.png')}
      />
    </View>
  );
};
export const ListIcon = ({ width, height }: IProps) => {
  return (
    <View
      style={width && height ? { width: width, height: height } : style.icon}
    >
      <Image
        style={{ width: 45, height: 45 }}
        source={require('../../assets/icons/list-100.png')}
      />
    </View>
  );
};
export const PlusIcon = ({ width, height }: IProps) => {
  return (
    <View
      style={width && height ? { width: width, height: height } : style.icon}
    >
      <Image
        style={{ width: 45, height: 45 }}
        source={require('../../assets/icons/plus-50.png')}
      />
    </View>
  );
};
export const TrashBinIcon = ({ width, height }: IProps) => {
  return (
    <View
      style={width && height ? { width: width, height: height } : style.icon}
    >
      <Image
        style={{ width: 45, height: 45 }}
        source={require('../../assets/icons/remove-50.png')}
      />
    </View>
  );
};
export const UserIcon = ({ width, height }: IProps) => {
  return (
    <View
      style={width && height ? { width: width, height: height } : style.icon}
    >
      <Image
        style={{ width: 45, height: 45 }}
        source={require('../../assets/icons/user-64.png')}
      />
    </View>
  );
};

export default {
  AddIcon,
  EditIcon,
  ListIcon,
  PlusIcon,
  TrashBinIcon,
  UserIcon,
};
