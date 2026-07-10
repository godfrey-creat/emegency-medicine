import {
  ActivityIndicator,
  Text,
} from 'react-native-paper';

interface Props {
  syncing: boolean;
}

export default function SyncIndicator({
  syncing,
}: Props) {
  if (!syncing)
    return <Text>Idle</Text>;

  return (
    <>
      <ActivityIndicator />
      <Text>Syncing...</Text>
    </>
  );
}