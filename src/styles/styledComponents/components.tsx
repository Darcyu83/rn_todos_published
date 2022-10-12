import styled from 'styled-components/native';

export const ScrnTitle = styled.Text`
  color: white;
  background-color: orange;
  font-size: 24px;
  margin: 5px 0px;
`;
export const SectionTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

export const OrangeTouchable = styled.TouchableOpacity`
  background-color: orange;
  border-radius: 5px;
  overflow: hidden;
`;

export const ModalTranspBgView = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;