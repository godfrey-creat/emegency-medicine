import { TriageRecord } from '../models/TriageRecord';

export type NetworkStatus = 'online' | 'offline';

export interface TriageState {
  records: TriageRecord[];
  networkStatus: NetworkStatus;
  isSyncing: boolean;
  pendingCount: number;
  lastSync: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: TriageState = {
  records: [],
  networkStatus: 'online',
  isSyncing: false,
  pendingCount: 0,
  lastSync: null,
  loading: false,
  error: null,
};

export type Action =
  | { type: 'SET_RECORDS'; payload: TriageRecord[] }
  | { type: 'ADD_RECORD'; payload: TriageRecord }
  | { type: 'MARK_SYNCED'; payload: string }
  | { type: 'DELETE_RECORD'; payload: string }
  | { type: 'SET_NETWORK'; payload: NetworkStatus }
  | { type: 'SET_PENDING'; payload: number }
  | { type: 'SET_SYNCING'; payload: boolean }
  | { type: 'SET_LAST_SYNC'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };