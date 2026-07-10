import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import TextInputField from '../Input/TextInputField';
import AppButton from '../Button/AppButton';
import PrioritySelector from '../PrioritySelector/PrioritySelector';
import StatusSelector from '../StatusSelector/StatusSelector';

import { triageSchema, TriageFormData } from '../../validation/triageSchema';
import { useTriage } from '../../context/TriageContext';

const TriageForm: React.FC = () => {
  const { createTriageRecord } = useTriage();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TriageFormData>({
    resolver: zodResolver(triageSchema),
    defaultValues: {
      patientName: '',
      conditionDescription: '',
      priority: 3,
      status: 'Pending',
    },
  });

  const onSubmit = async (data: TriageFormData) => {
    try {
      setLoading(true);

      await createTriageRecord({
        patientName: data.patientName.trim(),
        conditionDescription: data.conditionDescription.trim(),
        priority: data.priority as 1 | 2 | 3 | 4 | 5,
        status: data.status,
      });

      Toast.show({
        type: 'success',
        text1: 'Triage Saved',
        text2: 'Patient record saved successfully.',
      });

      reset();
    } catch (error) {
      console.error(error);

      Toast.show({
        type: 'error',
        text1: 'Save Failed',
        text2: 'Unable to save patient record.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="patientName"
        render={({ field: { onChange, value } }) => (
          <TextInputField
            label="Patient Name"
            value={value}
            onChange={onChange}
            error={errors.patientName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="conditionDescription"
        render={({ field: { onChange, value } }) => (
          <TextInputField
            label="Condition Description"
            value={value}
            multiline
            numberOfLines={4}
            onChange={onChange}
            error={errors.conditionDescription?.message}
          />
        )}
      />

      <Text style={styles.label}>Priority Level</Text>

      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <PrioritySelector
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Text style={styles.label}>Status</Text>

      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <StatusSelector
            value={value}
            onChange={onChange}
          />
        )}
      />

      <AppButton
        title={loading ? 'Saving...' : 'Submit Triage'}
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default TriageForm;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: -8,
  },
});