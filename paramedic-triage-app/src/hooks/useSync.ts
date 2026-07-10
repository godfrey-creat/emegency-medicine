import { useTriage } from '../context/TriageContext';

export function useSync() {
  const { state } = useTriage();

  return {
    syncing: state.isSyncing,
    pending: state.pendingCount,
    lastSync: state.lastSync,
  };
}