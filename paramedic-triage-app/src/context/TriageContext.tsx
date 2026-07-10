import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import {
  Action,
  initialState,
  TriageState,
} from './actions';

import { triageReducer } from './reducer';

import { triageRepository } from '../repositories';

interface ContextType {
  state: TriageState;

  dispatch: React.Dispatch<Action>;

  refreshRecords: () => Promise<void>;
}

const TriageContext =
  createContext<ContextType | undefined>(
    undefined
  );

export function TriageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    triageReducer,
    initialState
  );

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
    } catch {
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

  useEffect(() => {
    refreshRecords();
  }, []);

  return (
    <TriageContext.Provider
      value={{
        state,
        dispatch,
        refreshRecords,
      }}
    >
      {children}
    </TriageContext.Provider>
  );
}

export function useTriage() {
  const context = useContext(
    TriageContext
  );

  if (!context) {
    throw new Error(
      'useTriage must be used within TriageProvider'
    );
  }

  return context;
}