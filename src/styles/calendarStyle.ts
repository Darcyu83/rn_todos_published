import { MarkedDates } from 'react-native-calendars/src/types';
import { store } from '../redux/store';
import { getThemeStyle } from '../utils/themeUtils';
import { theme } from './theme';

const { content_bg_primary, content_bg_primary_accent, text, text_white } =
  getThemeStyle();

export const DotStyle = {
  vacation: { key: 'vacation', color: 'red', selectedDotColor: 'blue' },
  massage: { key: 'massage', color: 'blue', selectedDotColor: 'blue' },
  workout: { key: 'workout', color: 'green' },
  meeting: { key: 'meeting', color: 'orange' },
  etc: { key: 'etc', color: 'slategray' },
};

export const periodStyle = {
  dot: { marked: true, dotColor: content_bg_primary_accent },
  single: {
    startingDay: true,
    endingDay: true,
    color: content_bg_primary_accent,
    textColor: text_white,
  },
  start: {
    startingDay: true,
    color: content_bg_primary_accent,
    textColor: text_white,
  },
  dot_start: {
    startingDay: true,
    color: content_bg_primary_accent,
    textColor: text_white,
    marked: true,
    dotColor: text_white,
  },
  mid: { color: content_bg_primary, textColor: text_white },
  dot_mid: {
    color: content_bg_primary,
    textColor: text_white,
    marked: true,
    dotColor: text_white,
  },
  end: {
    endingDay: true,
    color: content_bg_primary_accent,
    textColor: text_white,
  },
  dot_end: {
    endingDay: true,
    color: content_bg_primary_accent,
    textColor: text_white,
    marked: true,
    dotColor: text_white,
  },
};
