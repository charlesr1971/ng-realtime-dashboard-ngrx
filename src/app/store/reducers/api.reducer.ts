import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as AppState from '../state/app.state';

import { ApiErrorResponse, ApiErrorResponseDetails } from '../../core/models/ApiErrorResponse.model';
import { CustomTask } from '../../core/models/CustomTask.model';
import { EntityStatus } from '../../core/enums/entity-status.enums';
import { ErrorState } from '../../core/models/ErrorState.model';

import { ApiActions } from '../actions/api.actions';

/** CUSTOM TASKS - START */
export interface ApiCustomTasksState extends EntityState<CustomTask> {
  error: ErrorState;
  status: EntityStatus;
  selectedId: string;
}

export const apiCustomTasksEntityAdapter: EntityAdapter<CustomTask> = createEntityAdapter<CustomTask>({
  selectId: (customTask: CustomTask) => customTask.id,
});

export const initialApiCustomTasksState: ApiCustomTasksState = apiCustomTasksEntityAdapter.getInitialState({
  error: null,
  status: EntityStatus.LOADING,
  selectedId: ''
});

export const apiCustomTasksReducer = createReducer(
  initialApiCustomTasksState,
  // ApiActions.createCustomTask
  on(
    ApiActions.createCustomTask,
    (state): ApiCustomTasksState => ({
      ...state,
      error: null,
      status: EntityStatus.LOADING,
    })
  ),
  on(
    ApiActions.createCustomTaskSuccess,
    (state, { customTask }): ApiCustomTasksState =>
    apiCustomTasksEntityAdapter.addOne(customTask, {
        ...state,
        status: EntityStatus.DONE,
      })
  ),
  on(
    ApiActions.createCustomTaskFailure,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.ERROR,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_LOAD_ERROR' },
    })
  ),
  on(
    ApiActions.createCustomTaskNotFound,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.NOT_FOUND,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_NOT_FOUND' },
    })
  ),
  // ApiActions.readCustomTask
  on(
    ApiActions.readCustomTask,
    (state, { id }): ApiCustomTasksState => ({
      ...state,
      error: null,
      status: EntityStatus.LOADING,
      selectedId: id,
    })
  ),
  on(
    ApiActions.readCustomTaskSuccess,
    (state, { customTask }): ApiCustomTasksState =>
    apiCustomTasksEntityAdapter.addOne(customTask, {
        ...state,
        status: EntityStatus.DONE,
      })
  ),
  on(
    ApiActions.readCustomTaskFailure,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.ERROR,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_LOAD_ERROR' },
    })
  ),
  on(
    ApiActions.readCustomTaskNotFound,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.NOT_FOUND,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_NOT_FOUND' },
    })
  ),
  // ApiActions.readCustomTasks
  on(
    ApiActions.readCustomTasks,
    (state): ApiCustomTasksState => ({
      ...state,
      error: null,
      status: EntityStatus.LOADING,
    })
  ),
  on(
    ApiActions.readCustomTasksSuccess,
    (state, { customTasks }): ApiCustomTasksState =>
      apiCustomTasksEntityAdapter.addAll(customTasks, {
        ...state,
        status: EntityStatus.DONE,
      })
  ),
  on(
    ApiActions.readCustomTasksFailure,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.ERROR,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_LOAD_ERROR' },
    })
  ),
  on(
    ApiActions.readCustomTasksNotFound,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.NOT_FOUND,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_NOT_FOUND' },
    })
  ),
  // ApiActions.patchCustomTask
  on(
    ApiActions.patchCustomTask,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.UPDATING,
      error: null
    })
  ),
  on(
    ApiActions.patchCustomTaskSuccess,
    (state, { customTask }): ApiCustomTasksState => {
      return apiCustomTasksEntityAdapter.upsertOne(customTask, {
        ...state,
        status: EntityStatus.DONE,
        error: null,
      });
    }
  ),
  on(
    ApiActions.patchCustomTaskFailure,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.ERROR,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_LOAD_ERROR' },
    })
  ),
  on(
    ApiActions.patchCustomTaskNotFound,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.NOT_FOUND,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_NOT_FOUND' },
    })
  ),
  // ApiActions.updateCustomTask
  on(
    ApiActions.updateCustomTask,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.UPDATING,
      error: null
    })
  ),
  on(
    ApiActions.updateCustomTaskSuccess,
    (state, { id, customTask }): ApiCustomTasksState => {
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
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.ERROR,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_LOAD_ERROR' },
    })
  ),
  on(
    ApiActions.updateCustomTaskNotFound,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.NOT_FOUND,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_NOT_FOUND' },
    })
  ),
  // ApiActions.deleteCustomTask
  on(
    ApiActions.deleteCustomTask,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.UPDATING,
      error: null
    })
  ),
  on(
    ApiActions.deleteCustomTaskSuccess,
    (state, { id }): ApiCustomTasksState => {
      return apiCustomTasksEntityAdapter.removeOne(id, {
        ...state,
        status: EntityStatus.DONE,
        error: null,
      });
    }
  ),
  on(
    ApiActions.deleteCustomTaskFailure,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.ERROR,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_LOAD_ERROR' },
    })
  ),
  on(
    ApiActions.deleteCustomTaskNotFound,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.NOT_FOUND,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_NOT_FOUND' },
    })
  ),
  // ApiActions.deleteCustomTasks
  on(
    ApiActions.deleteCustomTasks,
    (state): ApiCustomTasksState => ({
      ...state,
      error: null,
      status: EntityStatus.LOADING,
    })
  ),
  on(
    ApiActions.deleteCustomTasksSuccess,
    (state): ApiCustomTasksState =>
      apiCustomTasksEntityAdapter.removeAll({
        ...state,
        status: EntityStatus.DONE,
      })
  ),
  on(
    ApiActions.deleteCustomTasksFailure,
    (state): ApiCustomTasksState => ({
      ...state,
      status: EntityStatus.ERROR,
      error: { messageKey: 'API_COMMON.CUSTOM_TASKS_LOAD_ERROR' },
    })
  ),
  on(
    ApiActions.deleteCustomTasksNotFound,
    (state): ApiCustomTasksState => ({
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
  apiCustomTasksState: ApiCustomTasksState;
}

export const apisReducer: ActionReducerMap<ApisState> = {
  apiCustomTasksState: apiCustomTasksReducer,
};
/** API STATE - END */

