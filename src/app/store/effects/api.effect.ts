import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from '../reducers/api.reducer';
import { map, switchMap, mergeMap, catchError} from 'rxjs/operators';

import { of } from 'rxjs';

import { ApiErrorResponse, ApiErrorResponseDetails } from '../../core/models/ApiErrorResponse.model';
import { CustomTask } from '../../core/models/CustomTask.model';
import { ApiService } from '../../core/services/api.service';
import { ApiActions } from '../actions/api.actions';

@Injectable()
export class ApiEffects {

  createCustomTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.createCustomTask),
      mergeMap(({ customTask }) => {
        return this.apiService.createCustomTask(customTask).pipe(
          map((customTask: CustomTask) => ApiActions.createCustomTaskSuccess({ customTask })),
          catchError((error: ApiErrorResponse) => of(ApiActions.createCustomTaskFailure(error)))
        );
      })
    )
  );

  readCustomTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.readCustomTask),
      mergeMap(({ id }) => {
      return this.apiService.readCustomTask(id).pipe(
          map((customTask: CustomTask) => ApiActions.readCustomTaskSuccess({ customTask })),
          catchError((error: ApiErrorResponse) => of(ApiActions.readCustomTaskFailure(error)))
        );
      })
    )
  );

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

  patchCustomTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.patchCustomTask),
      mergeMap(({ id, customTask }) => {
      return this.apiService.patchCustomTask(id, customTask).pipe(
          map((customTask: CustomTask) => ApiActions.patchCustomTaskSuccess({ customTask })),
          catchError((error: ApiErrorResponse) => of(ApiActions.patchCustomTaskFailure(error)))
        );
      })
    )
  );

  updateCustomTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.updateCustomTask),
      mergeMap(({ id, customTask }) => {
      return this.apiService.updateCustomTask( customTask).pipe(
          map((customTask: CustomTask) => ApiActions.updateCustomTaskSuccess({ id: customTask.id, customTask })),
          catchError((error: ApiErrorResponse) => of(ApiActions.updateCustomTaskFailure(error)))
        );
      })
    )
  );

  deleteCustomTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.deleteCustomTask),
      mergeMap(({ id }) => {
      return this.apiService.deleteCustomTask( id).pipe(
          map((id: string) => ApiActions.deleteCustomTaskSuccess({ id })),
          catchError((error: ApiErrorResponse) => of(ApiActions.deleteCustomTaskFailure(error)))
        );
      })
    )
  );

  deleteCustomTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.deleteCustomTasks),
      mergeMap(() => {
      return this.apiService.deleteCustomTasks().pipe(
          map(() => ApiActions.deleteCustomTasksSuccess()),
          catchError((error: ApiErrorResponse) => of(ApiActions.deleteCustomTasksFailure(error)))
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<State>,
    private readonly apiService: ApiService
  ) {}

}
