import React from 'react';
import { RadioButton } from 'react-native-paper';

interface Props {
  value: 'Pending' | 'In-Transit';
  onChange(value: 'Pending' | 'In-Transit'): void;
}

export default function StatusSelector({
  value,
  onChange,
}: Props) {
  return (
    <RadioButton.Group
      value={value}
      onValueChange={(v) =>
        onChange(v as 'Pending' | 'In-Transit')
      }
    >
      <RadioButton.Item
        label="Pending"
        value="Pending"
      />

      <RadioButton.Item
        label="In Transit"
        value="In-Transit"
      />
    </RadioButton.Group>
  );
}