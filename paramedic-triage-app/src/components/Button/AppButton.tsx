import React from 'react';
import { Button } from 'react-native-paper';

interface Props {
  title: string;
  loading?: boolean;
  onPress(): void;
}

export default function AppButton({
  title,
  loading,
  onPress,
}: Props) {
  return (
    <Button
      mode="contained"
      loading={loading}
      onPress={onPress}
      style={{
        marginTop: 20,
      }}
    >
      {title}
    </Button>
  );
}