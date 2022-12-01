import React from 'react';
import { Text, View } from 'react-native';
import Dot from 'react-native-calendars/src/calendar/day/dot';
import styled from 'styled-components/native';
import { TTodoCate } from '../../redux/todos/types';
import { DotStyle } from '../../styles/calendarStyle';
import { SectionTitle } from '../../styles/styledComponents/components';
import { capitalizeFirstLetter } from '../../utils/stringUtils';

interface IProps {}

const Container = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const CategorySection = styled.View`
  width: 100%;
  max-width: 100%;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Category = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 2.5px;
`;

const DotCircle = styled.View<{ dotColor: string }>`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background-color: ${(props) => props.dotColor};
  margin-left: 3px;
`;

function TaskIndicator({}: IProps) {
  const arry = Object.keys(DotStyle) as Array<TTodoCate>;
  return (
    <Container
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        borderStyle: 'solid',
      }}
    >
      <SectionTitle>Category</SectionTitle>
      <CategorySection>
        {arry.map((key) => (
          <Category key={key}>
            <Text style={{ textAlign: 'center', color: 'white' }}>
              {capitalizeFirstLetter(DotStyle[key].key)}
            </Text>
            <DotCircle dotColor={DotStyle[key].color} />
          </Category>
        ))}
      </CategorySection>
    </Container>
  );
}

export default TaskIndicator;
