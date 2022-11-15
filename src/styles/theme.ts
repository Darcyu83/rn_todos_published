import { DefaultTheme } from 'styled-components/native';
import { store } from '../redux/store';

export const theme: { [key in 'lightMode' | 'darkMode']: DefaultTheme } = {
  lightMode: {
    bg: 'white',
    text: 'black',
    content_bg_primary: '#70d7c7',
    content_bg_primary_accent: '#50cebb',
    text_white: 'white',
  },

  darkMode: {
    bg: 'black',
    text: 'white',
    content_bg_primary: '#ffd7c7',
    content_bg_primary_accent: '#ffcebb',
    text_white: 'white',
  },
};

export const GlobalTheme = () =>
  store.getState().theme.isDarkMode ? theme.darkMode : theme.lightMode;
