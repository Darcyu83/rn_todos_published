import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { EditIcon, TrashBinIcon } from '../../components/icons/pngs';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { todosActions } from '../../redux/todos/todosSlice';
import { TTodo } from '../../redux/todos/types';
import { BORDER_RADIUS, SCREEN_HEIGHT } from '../../styles/constants';
import { CustomStyle } from '../../styles/shadowStyle';

const Container = styled.View`
  background-color: #333248;
  width: 100%;
  min-height: 30%;
  min-width: 100%;
  border-radius: ${BORDER_RADIUS}px;
  overflow: hidden;
  padding: 10px;
  justify-content: center;
`;

const RowContainer = styled.View`
  justify-content: space-between;
  width: 100%;
`;

const BtnWrapper = styled.View<{ right: number }>`
  width: ${25}px;
  height: ${25}px;
  z-index: 99;
  position: absolute;
  top: 10%;
  right: ${(props) => props.right}px;
  border-radius: 999px;
  background-color: #c0bcbc;
  border: 3px solid #ffd955;
`;

const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
`;

const ContentContainer = styled.View`
  flex-direction: row;
`;
const SubTitle = styled.Text`
  color: white;
`;
const CardContent = styled.Text`
  color: #c0bcbc;
  margin-bottom: 5px;
`;
interface IProps {
  todo: TTodo;

  index: number;
  onPressToModify: () => void;
}

function TodoCard({ todo, index, onPressToModify }: IProps) {
  const { userId } = useAppSelector((state) => state.user.info);
  const dispatch = useAppDispatch();

  const onRemoveTodohandler = async () => {
    if (!userId) return;

    try {
      dispatch(todosActions.deleteTodo({ taskId: todo.id }));
    } catch (error) {
      console.log(
        '%c Remove todo ==== error:: ',
        'background-color: tomato',
        error
      );
    }
  };

  const rotateAni = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(rotateAni.current, {
      toValue: 1,
      duration: 200 + index * 100,
      useNativeDriver: true,
    }).start();
  }, [index]);

  return (
    <Animated.View
      style={[
        { width: '100%', marginBottom: 5 },
        CustomStyle.shadow,
        {
          transform: [
            { scale: rotateAni.current },
            {
              rotate: rotateAni.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['35deg', '0deg'],
              }),
            },
          ],
        },
      ]}
    >
      <Container>
        <RowContainer>
          {/* ROW1 :  타이틀 */}
          <CardTitle numberOfLines={2} adjustsFontSizeToFit>{`${
            todo.title.charAt(0).toUpperCase() + todo.category.slice(1)
          }`}</CardTitle>
        </RowContainer>

        {/* ROW2 :   내용 */}
        <RowContainer>
          {/* 카테고리 */}
          <ContentContainer>
            <SubTitle>Category : </SubTitle>
            <CardContent>
              {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
            </CardContent>
          </ContentContainer>
          {/* 할일 디테일 */}
          <ContentContainer>
            <SubTitle>Details : </SubTitle>
            <CardContent>{todo.todo}</CardContent>
          </ContentContainer>
          {/* 기간 */}
          <ContentContainer>
            <SubTitle>Period : </SubTitle>
            <CardContent>
              {todo.startDtData.dateString} ~ {todo.endDtData.dateString}
            </CardContent>
          </ContentContainer>
        </RowContainer>
      </Container>

      {/* 수정 버튼 */}
      <BtnWrapper right={35}>
        <TouchableOpacity onPress={onPressToModify}>
          <EditIcon />
        </TouchableOpacity>
      </BtnWrapper>

      {/* 삭제 버튼 */}
      <BtnWrapper right={5}>
        <TouchableOpacity
          onPress={async () => {
            await onRemoveTodohandler();
          }}
        >
          <TrashBinIcon width="100%" height="100%" />
        </TouchableOpacity>
      </BtnWrapper>
    </Animated.View>
  );
}

export default TodoCard;
