import { ITransactionState, initialTransactionState } from './cash.state';

export interface AppState {
  transactions: ITransactionState;
}

export const initialAppState: AppState = {
  transactions: initialTransactionState
};

export function getInitialState(): AppState {
  return initialAppState;
}

// tslint:disable-next-line: no-empty-interface
export interface State {}
