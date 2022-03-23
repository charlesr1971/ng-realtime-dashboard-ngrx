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
  selectedId: string;
}

export const apiCustomTasksEntityAdapter: EntityAdapter<CustomTask> = createEntityAdapter<CustomTask>({
  selectId: (customTask: CustomTask) => customTask.id,
});

export const initialCustomTasksState: CustomTasksState = apiCustomTasksEntityAdapter.getInitialState({
  error: null,
  status: EntityStatus.LOADING,
  selectedId: ''
});

export const apiCustomTasksReducer = createReducer(
  initialCustomTasksState,

  on(
    ApiActions.createCustomTask,
    (state): CustomTasksState => ({
      ...state,
      error: null,
      status: EntityStatus.LOADING,
    })
  ),
  on(
    ApiActions.createCustomTaskSuccess,
    (state, { customTask }): CustomTasksState =>
    apiCustomTasksEntityAdapter.addOne(customTask, {
        ...state,
        status: EntityStatus.DONE,
      })
  ),
  on(
    ApiActions.createCustomTaskFailure,
    (state): CustomTasksState => ({
      ...state,
      status: EntityStatus.ERROR,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_LOAD_ERROR' },
    })
  ),
  on(
    ApiActions.createCustomTaskNotFound,
    (state): CustomTasksState => ({
      ...state,
      status: EntityStatus.NOT_FOUND,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_NOT_FOUND' },
    })
  ),

  on(
    ApiActions.readCustomTask,
    (state, { id }): CustomTasksState => ({
      ...state,
      error: null,
      status: EntityStatus.LOADING,
      selectedId: id,
    })
  ),
  on(
    ApiActions.readCustomTaskSuccess,
    (state, { customTask }): CustomTasksState =>
    apiCustomTasksEntityAdapter.addOne(customTask, {
        ...state,
        status: EntityStatus.DONE,
      })
  ),
  on(
    ApiActions.readCustomTaskFailure,
    (state): CustomTasksState => ({
      ...state,
      status: EntityStatus.ERROR,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_LOAD_ERROR' },
    })
  ),
  on(
    ApiActions.readCustomTaskNotFound,
    (state): CustomTasksState => ({
      ...state,
      status: EntityStatus.NOT_FOUND,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_NOT_FOUND' },
    })
  ),

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
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_LOAD_ERROR' },
    })
  ),
  on(
    ApiActions.readCustomTasksNotFound,
    (state): CustomTasksState => ({
      ...state,
      status: EntityStatus.NOT_FOUND,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_NOT_FOUND' },
    })
  ),

  on(
    ApiActions.patchCustomTask,
    (state): CustomTasksState => ({
      ...state,
      status: EntityStatus.UPDATING,
      error: null
    })
  ),
  on(
    ApiActions.patchCustomTaskSuccess,
    (state, { customTask }): CustomTasksState => {
      return apiCustomTasksEntityAdapter.upsertOne(customTask, {
        ...state,
        status: EntityStatus.DONE,
        error: null,
      });
    }
  ),
  on(
    ApiActions.patchCustomTaskFailure,
    (state): CustomTasksState => ({
      ...state,
      status: EntityStatus.ERROR,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_LOAD_ERROR' },
    })
  ),
  on(
    ApiActions.patchCustomTaskNotFound,
    (state): CustomTasksState => ({
      ...state,
      status: EntityStatus.NOT_FOUND,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_NOT_FOUND' },
    })
  ),

  on(
    ApiActions.updateCustomTask,
    (state): CustomTasksState => ({
      ...state,
      status: EntityStatus.UPDATING,
      error: null
    })
  ),
  on(
    ApiActions.updateCustomTaskSuccess,
    (state, { id, customTask }): CustomTasksState => {
      const update: Update<CustomTask> = {
        id,
        changes: {
          ...customTask
        },
      };
      return apiCustomTasksEntityAdapter.updateOne(update, {
        ...state,
        status: EntityStatus.DONE,
        error: null,
      });
    }
  ),
  on(
    ApiActions.updateCustomTaskFailure,
    (state): CustomTasksState => ({
      ...state,
      status: EntityStatus.ERROR,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_LOAD_ERROR' },
    })
  ),
  on(
    ApiActions.updateCustomTaskNotFound,
    (state): CustomTasksState => ({
      ...state,
      status: EntityStatus.NOT_FOUND,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_NOT_FOUND' },
    })
  ),

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


