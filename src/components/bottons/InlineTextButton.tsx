import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { AppStyles } from '../../styles/appStyles';

const ContainerPressable = styled.Pressable``;
interface IProps {
  title: string;
  onPress: () => void;
}

function InlineTextButton({ title, onPress }: IProps) {
  return (
    <ContainerPressable onPress={onPress}>
      {({ pressed }) => (
        <Text
          style={[
            pressed
              ? AppStyles.pressedInlineTextButton
              : AppStyles.inlineTextButton,
          ]}
        >
          {title}
        </Text>
      )}
    </ContainerPressable>
  );
}

export default InlineTextButton;
