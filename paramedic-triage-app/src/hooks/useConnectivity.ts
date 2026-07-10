import { useTriage } from '../context/TriageContext';

export function useConnectivity() {
  const { state } = useTriage();

  return {
    isOnline: state.networkStatus === 'online',
  };
}