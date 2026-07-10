import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {
  Text,
} from 'react-native-paper';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineMedium">
        Paramedic Triage Intake
      </Text>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });