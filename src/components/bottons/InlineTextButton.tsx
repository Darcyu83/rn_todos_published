import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppStyles } from '../../styles/appStyles';

interface IProps {
  title: string;
  onPress: () => void;
}

const InlineTextButton = ({ title, onPress }: IProps) => {
  return (
    <Pressable onPress={onPress} style={{}}>
      {({ pressed }) => (
        <Text
          style={[
            pressed
              ? AppStyles.pressedInlineTextButton
              : AppStyles.inlineTextButton,
            ,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default InlineTextButton;
