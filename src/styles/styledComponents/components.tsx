import styled from 'styled-components/native';
import { SCREEN_WIDTH } from '../constants';

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

export const BtnClosingTouchable = styled.TouchableOpacity<{
  top: number;
  right: number;
}>`
  width: ${SCREEN_WIDTH * 0.1}px;
  height: ${SCREEN_WIDTH * 0.1}px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  top: ${(props) => props.top}px;
  right: ${(props) => props.right}px;
  justify-content: center;
  align-items: center;
`;
