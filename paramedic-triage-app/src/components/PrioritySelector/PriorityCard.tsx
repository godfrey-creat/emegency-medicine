import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface Props {
  title: string;
  description: string;
  color: string;
  selected: boolean;
  onPress(): void;
}

export default function PriorityCard({
  title,
  description,
  color,
  selected,
  onPress,
}: Props) {
  return (
    <Card
      mode={selected ? 'contained' : 'outlined'}
      onPress={onPress}
      style={[
        styles.card,
        {
          borderLeftWidth: 8,
          borderLeftColor: color,
        },
      ]}
    >
      <Card.Content>
        <Text variant="titleMedium">{title}</Text>
        <Text>{description}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
});