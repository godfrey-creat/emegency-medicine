import React from 'react';
import { KeyboardTypeOptions } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

interface Props {
  label: string;
  value: string;
  onChange: (text: string) => void;

  error?: string;

  multiline?: boolean;
  numberOfLines?: number;

  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  disabled?: boolean;
}

export default function TextInputField({
  label,
  value,
  onChange,
  error,
  multiline = false,
  numberOfLines = 1,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  disabled = false,
}: Props) {
  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        disabled={disabled}
        error={!!error}
        onChangeText={onChange}
        style={{ marginBottom: 4 }}
      />

      {error && (
        <HelperText type="error" visible>
          {error}
        </HelperText>
      )}
    </>
  );
}