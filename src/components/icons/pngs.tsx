import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createGlobalStyle } from 'styled-components';
import { ICON_SIZE } from '../../styles/constants';

interface IProps {
  width?: number | string;
  height?: number | string;
  focused?: boolean;
  color?: string;
  size?: number;
  isBtmLineShown?: boolean;
}

const style = StyleSheet.create({
  icon: { width: '100%', height: '100%' },
});

export function AddIcon({
  width = '100%',
  height = '100%',
  focused,
  color,
  size,
  isBtmLineShown,
}: IProps) {
  return (
    <View
      style={[
        { width: '100%', height: '100%' },
        isBtmLineShown
          ? {
              borderBottomColor: color,
              borderBottomWidth: 2,
            }
          : {},
      ]}
    >
      <Image
        style={[{ width: '100%', height: '100%' }]}
        source={require('../../assets/icons/add-80.png')}
      />
    </View>
  );
}

export function EditIcon({
  width = '100%',
  height = '100%',
  focused,
  color,
  size,
  isBtmLineShown,
}: IProps) {
  return (
    <View
      style={[
        size ? { width: size * 1.5, height: size * 1.5 } : { width, height },
        isBtmLineShown
          ? {
              borderBottomColor: color,
              borderBottomWidth: 2,
            }
          : {},
      ]}
    >
      <Image
        style={[{ width: '100%', height: '100%' }]}
        source={require('../../assets/icons/edit-80.png')}
      />
    </View>
  );
}
export function ListIcon({
  width = '100%',
  height = '100%',
  focused,
  color,
  size,
  isBtmLineShown,
}: IProps) {
  return (
    <View
      style={[
        size ? { width: size * 1.5, height: size * 1.5 } : { width, height },
        isBtmLineShown
          ? {
              borderBottomColor: color,
              borderBottomWidth: 3,
            }
          : {},
      ]}
    >
      <Image
        style={[{ width: '100%', height: '100%' }]}
        source={require('../../assets/icons/list-100.png')}
      />
    </View>
  );
}
export function PlusIcon({
  width = '100%',
  height = '100%',
  focused,
  color,
  size,
  isBtmLineShown,
}: IProps) {
  return (
    <View
      style={[
        size ? { width: size * 1.5, height: size * 1.5 } : { width, height },
        isBtmLineShown
          ? {
              borderBottomColor: color,
              borderBottomWidth: 2,
            }
          : {},
      ]}
    >
      <Image
        style={[{ width: '100%', height: '100%' }]}
        source={require('../../assets/icons/plus-50.png')}
      />
    </View>
  );
}
export function TrashBinIcon({
  width = '100%',
  height = '100%',
  focused,
  color,
  size,
  isBtmLineShown,
}: IProps) {
  return (
    <View
      style={[
        size ? { width: size * 1.5, height: size * 1.5 } : { width, height },
        isBtmLineShown
          ? {
              borderBottomColor: color,
              borderBottomWidth: 2,
            }
          : {},
      ]}
    >
      <Image
        style={[{ width: '100%', height: '100%' }]}
        source={require('../../assets/icons/remove-50.png')}
      />
    </View>
  );
}
export function UserIcon({
  width = '100%',
  height = '100%',
  focused,
  color,
  size,
  isBtmLineShown,
}: IProps) {
  return (
    <View
      style={[
        size ? { width: size * 1.5, height: size * 1.5 } : { width, height },
        isBtmLineShown
          ? {
              borderBottomColor: color,
              borderBottomWidth: 2,
            }
          : {},
      ]}
    >
      <Image
        style={[{ width: '100%', height: '100%' }]}
        source={require('../../assets/icons/user-64.png')}
      />
    </View>
  );
}

export default {
  AddIcon,
  EditIcon,
  ListIcon,
  PlusIcon,
  TrashBinIcon,
  UserIcon,
};
