import { Platform } from 'react-native';

export const CustomStyle = {
  shadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
        }
      : { elevation: 5 },
};
