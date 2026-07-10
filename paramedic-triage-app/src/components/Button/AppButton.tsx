import {
  Button,
} from 'react-native-paper';

interface Props {
  title: string;

  onPress(): void;

  loading?: boolean;
}

export default function AppButton({
  title,
  onPress,
  loading,
}: Props) {
  return (
    <Button
      mode="contained"
      loading={loading}
      onPress={onPress}
    >
      {title}
    </Button>
  );
}