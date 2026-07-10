import { z } from 'zod';

export const triageSchema = z.object({
  patientName: z
    .string()
    .min(2, 'Patient name is required'),

  conditionDescription: z
    .string()
    .min(5, 'Condition description is required'),

  priority: z
    .number()
    .min(1, 'Select a priority')
    .max(5),

  status: z.enum(['Pending', 'In-Transit']),
});

export type TriageFormData = z.infer<typeof triageSchema>;