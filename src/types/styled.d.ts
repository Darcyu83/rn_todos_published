import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    bg: string;
    content_bg_primary: string;
    content_bg_primary_accent: string;
    text_white: string;
    text: string;
  }
}
