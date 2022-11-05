import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const returnLoadingScrn = (isLoading: boolean) => {
  return (
    <Container>
      <ActivityIndicator size="large" color="#ffd966" />
    </Container>
  );
};
