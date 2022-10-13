import { MarkedDates } from 'react-native-calendars/src/types';
import { store } from '../../redux/store';
import { theme } from '../../styles/theme';

const _theme = store.getState().theme.isDarkMode
  ? theme.darkMode
  : theme.lightMode;

const { bg_primary, bg_primary_accent, text, text_white } = _theme;

export const DotStyle = {
  vacation: { key: 'vacation', color: 'red', selectedDotColor: 'blue' },
  massage: { key: 'massage', color: 'blue', selectedDotColor: 'blue' },
  workout: { key: 'workout', color: 'green' },
  meeting: { key: 'meeting', color: 'orange' },
};

export const periodStyle = {
  dot: { marked: true, dotColor: bg_primary_accent },
  single: {
    startingDay: true,
    endingDay: true,
    color: bg_primary_accent,
    textColor: text_white,
  },
  start: {
    startingDay: true,
    color: bg_primary_accent,
    textColor: text_white,
  },
  dot_start: {
    startingDay: true,
    color: bg_primary_accent,
    textColor: text_white,
    marked: true,
    dotColor: text_white,
  },
  mid: { color: bg_primary, textColor: text_white },
  dot_mid: {
    color: bg_primary,
    textColor: text_white,
    marked: true,
    dotColor: text_white,
  },
  end: { endingDay: true, color: bg_primary_accent, textColor: text_white },
  dot_end: {
    endingDay: true,
    color: bg_primary_accent,
    textColor: text_white,
    marked: true,
    dotColor: text_white,
  },
};
