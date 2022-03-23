import { AppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { ITransactionState } from '../state/cash.state';

const selectTransactions = (state: AppState) => state.transactions;
export const selectTransactionsStream = createSelector(
  selectTransactions,
  (state: ITransactionState) => state.transactions
);
