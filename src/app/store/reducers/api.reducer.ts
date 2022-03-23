import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as AppState from '../state/app.state';

import { ApiErrorResponse, ApiErrorResponseDetails } from '../../core/models/ApiErrorResponse.model';
import { CustomTask } from '../../core/models/CustomTask.model';
import { EntityStatus } from '../../core/enums/entity-status.enums';
import { ErrorState } from '../../core/models/ErrorState.model';

import { ApiActions } from '../actions/api.actions';

/** CUSTOM TASKS - START */
export interface CustomTasksState extends EntityState<CustomTask> {
  error: ErrorState;
  status: EntityStatus;
}

export const apiCustomTasksEntityAdapter: EntityAdapter<CustomTask> = createEntityAdapter<CustomTask>({
  selectId: (customTask: CustomTask) => customTask.id,
});

export const initialCustomTasksState: CustomTasksState = apiCustomTasksEntityAdapter.getInitialState({
  error: null,
  status: EntityStatus.LOADING,
});

export const apiCustomTasksReducer = createReducer(
  initialCustomTasksState,
  on(
    ApiActions.readCustomTasks,
    (state): CustomTasksState => ({
      ...state,
      error: null,
      status: EntityStatus.LOADING,
    })
  ),
  on(
    ApiActions.readCustomTasksSuccess,
    (state, { customTasks }): CustomTasksState =>
      apiCustomTasksEntityAdapter.addAll(customTasks, {
        ...state,
        status: EntityStatus.DONE,
      })
  ),
  on(
    ApiActions.readCustomTasksFailure,
    (state): CustomTasksState => ({
      ...state,
      status: EntityStatus.ERROR,
      error: { messageKey: 'API_COMMON.ORDER_ITEMS_LOAD_ERROR' },
    })
  )
);
/** CUSTOM TASKS - END */


export const apisFeatureKey = 'apis';

export interface State extends AppState.State {
  apis: ApisState;
}

export interface ApisState {
  apiCustomTasksState: CustomTasksState;
}

export const apisReducer: ActionReducerMap<ApisState> = {
  apiCustomTasksState: apiCustomTasksReducer,
};
/** API STATE - END */


