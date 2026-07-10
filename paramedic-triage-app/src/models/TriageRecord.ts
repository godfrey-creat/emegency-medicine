export type PatientStatus =
  | 'Pending'
  | 'In-Transit';

export interface TriageRecord {
  id: string;

  patientName: string;

  conditionDescription: string;

  priority: 1 | 2 | 3 | 4 | 5;

  status: PatientStatus;

  isSynced: boolean;

  createdAt: string;

  updatedAt: string;
}