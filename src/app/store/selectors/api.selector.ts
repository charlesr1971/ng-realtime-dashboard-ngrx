import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { pipe } from 'rxjs';
import { filter, map, scan } from 'rxjs/operators';
import { EntityStatus } from '../../core/enums/entity-status.enums';
import {
  apiCustomTasksEntityAdapter,
  ApisState,
  ApiCustomTasksState,
  apisFeatureKey
} from '../reducers/api.reducer';

const selectApisState = createFeatureSelector<ApisState>(apisFeatureKey);

export const selectApiState = createSelector(selectApisState, (state: ApisState) => state.apiCustomTasksState);

export const selectApiCustomTaskState = createSelector(selectApisState, (state: ApisState) => state.apiCustomTasksState);

export const selectApiReadCustomTask$ = pipe(
  select(selectApiCustomTaskState),
  filter((state) => state.status === EntityStatus.DONE),
  map((state: ApiCustomTasksState) => state.entities[state.selectedId])
);

export const selectApiReadCustomTasks$ = pipe(
  select(selectApiCustomTaskState),
  filter((state) => state.status === EntityStatus.DONE)
);
