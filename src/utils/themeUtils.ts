import { store } from '../redux/store';
import { toggleDarkMode } from '../redux/theme/themeSlice';
import { theme } from '../styles/theme';

export const onToggleDarkMode = () => {
  store.dispatch(toggleDarkMode());
};

export const getThemeStyle = () => {
  const _theme = store.getState().theme.isDarkMode
    ? theme.darkMode
    : theme.lightMode;
  return _theme;
};
