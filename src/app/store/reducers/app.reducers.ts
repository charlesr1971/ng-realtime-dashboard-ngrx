import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { transactionsReducers } from './cash.reducer';

export const appReducers: ActionReducerMap<AppState, any> = {
  transactions: transactionsReducers
};

