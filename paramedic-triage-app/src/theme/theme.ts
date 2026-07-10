import {
  MD3LightTheme,
  MD3Theme,
} from 'react-native-paper';

import { Colors } from '../constants/colors';

export const appTheme: MD3Theme = {
  ...MD3LightTheme,

  colors: {
    ...MD3LightTheme.colors,

    primary: Colors.primary,

    secondary: Colors.secondary,

    background: Colors.background,

    surface: Colors.surface,

    error: Colors.error,
  },
};