import React from 'react';
import { Text, View } from 'react-native';
import Dot from 'react-native-calendars/src/calendar/day/dot';
import { TTodoCate } from '../../redux/todos/types';
import { DotStyle } from '../../styles/calendarStyle';
import { SectionTitle } from '../../styles/styledComponents/components';
import { capitalizeFirstLetter } from '../../utils/stringUtils';

interface IProps {}

const TaskIndicator = ({}: IProps) => {
  const arry = Object.keys(DotStyle) as Array<TTodoCate>;
  return (
    <View>
      <SectionTitle>Category</SectionTitle>
      <View
        style={{
          width: '100%',
          maxWidth: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {arry.map((key) => {
          return (
            <View
              key={key}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 2.5,
              }}
            >
              <Text style={{ textAlign: 'center' }}>
                {capitalizeFirstLetter(DotStyle[key].key)}
              </Text>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: DotStyle[key].color,
                  marginLeft: 3,
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TaskIndicator;
