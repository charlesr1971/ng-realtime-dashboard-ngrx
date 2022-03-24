import { createAction, props } from '@ngrx/store';
import { ApiErrorResponse, ApiErrorResponseDetails } from '../../core/models/ApiErrorResponse.model';
import { CustomTask } from '../../core/models/CustomTask.model';

const createCustomTask = createAction('[Api API] Create Custom Task', props<{ customTask: CustomTask }>());
const createCustomTaskSuccess = createAction('[Api API] Create Custom Task Success', props<{ customTask: CustomTask }>());
const createCustomTaskFailure = createAction('[Api API] Create Custom Task Fail', props<ApiErrorResponse>());
const createCustomTaskNotFound = createAction('[Api API] Create Custom Task Not Found', props<ApiErrorResponse>());

const readCustomTask = createAction('[Api API] Read Custom Task', props<{ id: string }>());
const readCustomTaskSuccess = createAction('[Api API] Read Custom Task Success', props<{ customTask: CustomTask }>());
const readCustomTaskFailure = createAction('[Api API] Read Custom Task Fail', props<ApiErrorResponse>());
const readCustomTaskNotFound = createAction('[Api API] Read Custom Task Not Found', props<ApiErrorResponse>());

const readCustomTasks = createAction('[Api API] Read Custom Tasks');
const readCustomTasksSuccess = createAction('[Api API] Read Custom Tasks Success', props<{ customTasks: CustomTask[] }>());
const readCustomTasksFailure = createAction('[Api API] Read Custom Tasks Fail', props<ApiErrorResponse>());
const readCustomTasksNotFound = createAction('[Api API] Read Custom Tasks Not Found', props<ApiErrorResponse>());

const patchCustomTask = createAction('[Api API] Patch Custom Task', props<{ id: string; customTask: CustomTask }>());
const patchCustomTaskSuccess = createAction('[Api API] Patch Custom Task Success', props<{ customTask: CustomTask }>());
const patchCustomTaskFailure = createAction('[Api API] Patch Custom Task Fail', props<ApiErrorResponse>());
const patchCustomTaskNotFound = createAction('[Api API] Patch Custom Task Not Found', props<ApiErrorResponse>());

const updateCustomTask = createAction('[Api API] Update Custom Task', props<{ id: string; customTask: CustomTask }>());
const updateCustomTaskSuccess = createAction('[Api API] Update Custom Task Success', props<{ id: string; customTask: CustomTask }>());
const updateCustomTaskFailure = createAction('[Api API] Update Custom Task Fail', props<ApiErrorResponse>());
const updateCustomTaskNotFound = createAction('[Api API] Update Custom Task Not Found', props<ApiErrorResponse>());

const deleteCustomTask = createAction('[Api API] Delete Custom Task', props<{ id: string }>());
const deleteCustomTaskSuccess = createAction('[Api API] Delete Custom Task Success', props<{ id: string }>());
const deleteCustomTaskFailure = createAction('[Api API] Delete Custom Task Fail', props<ApiErrorResponse>());
const deleteCustomTaskNotFound = createAction('[Api API] Delete Custom Task Not Found', props<ApiErrorResponse>());

const deleteCustomTasks = createAction('[Api API] Delete Custom Tasks');
const deleteCustomTasksSuccess = createAction('[Api API] Delete Custom Tasks Success');
const deleteCustomTasksFailure = createAction('[Api API] Delete Custom Tasks Fail', props<ApiErrorResponse>());
const deleteCustomTasksNotFound = createAction('[Api API] Delete Custom Tasks Not Found', props<ApiErrorResponse>());

export const ApiActions = {
  createCustomTask,
  createCustomTaskSuccess,
  createCustomTaskFailure,
  createCustomTaskNotFound,
  readCustomTask,
  readCustomTaskSuccess,
  readCustomTaskFailure,
  readCustomTaskNotFound,
  readCustomTasks,
  readCustomTasksSuccess,
  readCustomTasksFailure,
  readCustomTasksNotFound,
  patchCustomTask,
  patchCustomTaskSuccess,
  patchCustomTaskFailure,
  patchCustomTaskNotFound,
  updateCustomTask,
  updateCustomTaskSuccess,
  updateCustomTaskFailure,
  updateCustomTaskNotFound,
  deleteCustomTask,
  deleteCustomTaskSuccess,
  deleteCustomTaskFailure,
  deleteCustomTaskNotFound,
  deleteCustomTasks,
  deleteCustomTasksSuccess,
  deleteCustomTasksFailure,
  deleteCustomTasksNotFound
};
