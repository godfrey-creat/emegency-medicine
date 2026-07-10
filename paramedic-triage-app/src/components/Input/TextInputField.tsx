import {
  TextInput,
} from 'react-native-paper';

interface Props {
  label: string;

  value: string;

  onChange(text: string): void;

  multiline?: boolean;
}

export default function TextInputField({
  label,
  value,
  onChange,
  multiline,
}: Props) {
  return (
    <TextInput
      mode="outlined"
      label={label}
      value={value}
      multiline={multiline}
      onChangeText={onChange}
    />
  );
}