import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from '../reducers/api.reducer';
import { map, switchMap, mergeMap, catchError} from 'rxjs/operators';

import { of } from 'rxjs';

import { ApiErrorResponse, ApiErrorResponseDetails } from '../../core/models/ApiErrorResponse.model';
import { ApiService } from '../../core/services/api.service';
import { ApiActions } from '../actions/api.actions';

@Injectable()
export class ApiEffects {

  readCustomTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.readCustomTasks),
      mergeMap(() =>
        this.apiService.readCustomTasks().pipe(
          map((customTasks) =>
            ApiActions.readCustomTasksSuccess({
              customTasks: customTasks.map((task) => ({ ...task })),
            })
          ),
          catchError((error: ApiErrorResponse) => of(ApiActions.readCustomTasksFailure(error)))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<State>,
    private readonly apiService: ApiService
  ) {}

}
