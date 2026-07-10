import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider as PaperProvider } from 'react-native-paper';

import { appTheme } from './src/theme/theme';

import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={appTheme}>
        <RootNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}