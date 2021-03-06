import {Effect, Actions, ofType} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap} from 'rxjs/operators';

import { GET_TRANSATIONS, GetTransactions, GetTransactionsSuccess, GET_TRANSATIONS_SUCCESS } from '../actions/cash.action';
import { of } from 'rxjs';
import { ITransaction } from 'src/app/core/models/Transaction.model';
import { DataService } from 'src/app/core/services/data.service';

@Injectable()
export class TransactionEffects {

  constructor(private actions$: Actions, public service: DataService) {}
  @Effect()
  getTransactions$ = this.actions$.pipe(ofType<GetTransactions>(GET_TRANSATIONS),
  map((action: GetTransactions) => action.payload),
  switchMap(payload =>
    this.service.connect().pipe(
      map(
        result =>
          new GetTransactionsSuccess(result)
      )
    )));
}
