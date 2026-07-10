import { Action, TriageState } from './actions';

export function triageReducer(
  state: TriageState,
  action: Action
): TriageState {
  switch (action.type) {
    case 'SET_RECORDS':
      return {
        ...state,
        records: action.payload,
      };

    case 'ADD_RECORD':
      return {
        ...state,
        records: [action.payload, ...state.records],
        pendingCount: state.pendingCount + 1,
      };

    case 'MARK_SYNCED':
      return {
        ...state,

        records: state.records.map((record) =>
          record.id === action.payload
            ? { ...record, isSynced: true }
            : record
        ),

        pendingCount: Math.max(state.pendingCount - 1, 0),
      };

    case 'DELETE_RECORD':
      return {
        ...state,
        records: state.records.filter(
          (record) => record.id !== action.payload
        ),
      };

    case 'SET_NETWORK':
      return {
        ...state,
        networkStatus: action.payload,
      };

    case 'SET_PENDING':
      return {
        ...state,
        pendingCount: action.payload,
      };

    case 'SET_SYNCING':
      return {
        ...state,
        isSyncing: action.payload,
      };

    case 'SET_LAST_SYNC':
      return {
        ...state,
        lastSync: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}