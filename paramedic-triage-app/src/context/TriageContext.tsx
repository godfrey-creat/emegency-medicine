import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from 'react';

import { TriageRecord } from '../models/TriageRecord';
import { triageRepository } from '../repositories';
import { generateId } from '../utils';

import {
  Action,
  initialState,
  TriageState,
} from './actions';

import { triageReducer } from './reducer';

export interface CreateTriageRecordInput {
  patientName: string;
  conditionDescription: string;
  priority: 1 | 2 | 3 | 4 | 5;
  status: 'Pending' | 'In-Transit';
}

interface TriageContextType {
  state: TriageState;

  refreshRecords: () => Promise<void>;

  createTriageRecord: (
    data: CreateTriageRecordInput
  ) => Promise<TriageRecord>;

  deleteRecord: (
    id: string
  ) => Promise<void>;

  markRecordSynced: (
    id: string
  ) => Promise<void>;
}

const TriageContext =
  createContext<TriageContextType | undefined>(
    undefined
  );

export function TriageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    triageReducer,
    initialState
  );

  /**
   * Load all records from SQLite
   */
  async function refreshRecords() {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });

    try {
      const records =
        await triageRepository.findAll();

      const pending =
        await triageRepository.findPending();

      dispatch({
        type: 'SET_RECORDS',
        payload: records,
      });

      dispatch({
        type: 'SET_PENDING',
        payload: pending.length,
      });

      dispatch({
        type: 'SET_ERROR',
        payload: null,
      });
    } catch (error) {
      console.error(error);

      dispatch({
        type: 'SET_ERROR',
        payload: 'Unable to load records.',
      });
    } finally {
      dispatch({
        type: 'SET_LOADING',
        payload: false,
      });
    }
  }

  /**
   * Create a new triage record
   */
  async function createTriageRecord(
    data: CreateTriageRecordInput
  ): Promise<TriageRecord> {
    const now = new Date().toISOString();

    const record: TriageRecord = {
      id: generateId(),

      patientName: data.patientName,

      conditionDescription:
        data.conditionDescription,

      priority: data.priority,

      status: data.status,

      isSynced: false,

      createdAt: now,

      updatedAt: now,
    };

    await triageRepository.create(record);

    dispatch({
      type: 'ADD_RECORD',
      payload: record,
    });

    dispatch({
      type: 'SET_PENDING',
      payload: state.pendingCount + 1,
    });

    return record;
  }

  /**
   * Delete a record
   */
  async function deleteRecord(
    id: string
  ) {
    await triageRepository.delete(id);

    dispatch({
      type: 'DELETE_RECORD',
      payload: id,
    });

    await refreshRecords();
  }

  /**
   * Mark record synced
   */
  async function markRecordSynced(
    id: string
  ) {
    await triageRepository.markAsSynced(id);

    dispatch({
      type: 'MARK_SYNCED',
      payload: id,
    });

    dispatch({
      type: 'SET_LAST_SYNC',
      payload: new Date().toISOString(),
    });
  }

  useEffect(() => {
    refreshRecords();
  }, []);

  return (
    <TriageContext.Provider
      value={{
        state,

        refreshRecords,

        createTriageRecord,

        deleteRecord,

        markRecordSynced,
      }}
    >
      {children}
    </TriageContext.Provider>
  );
}

export function useTriage() {
  const context =
    useContext(TriageContext);

  if (!context) {
    throw new Error(
      'useTriage must be used within TriageProvider.'
    );
  }

  return context;
}