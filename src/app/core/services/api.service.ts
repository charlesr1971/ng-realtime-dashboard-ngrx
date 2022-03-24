import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CustomTask } from '../../core/models/CustomTask.model';

import {environment} from '../../../environments/environment';

export const REST_ENDPOINT_URI = environment.restEndpointUri;
export const REST_API_CREATE_CUSTOM_TASK = environment.restApiCreateCustomTask;
export const REST_API_READ_CUSTOM_TASK = environment.restApiReadCustomTask;
export const REST_API_READ_CUSTOM_TASKS = environment.restApiReadCustomTasks;
export const REST_API_UPDATE_CUSTOM_TASK = environment.restApiUpdateCustomTask;
export const REST_API_PATCH_CUSTOM_TASK = environment.restApiPatchCustomTask;
export const REST_API_DELETE_CUSTOM_TASK = environment.restApiDeleteCustomTask;
export const REST_API_DELETE_CUSTOM_TASKS = environment.restApiDeleteCustomTasks;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  debug = true;
  debugErr = true;

  constructor(private readonly http: HttpClient) { }

  createCustomTask(customTask: CustomTask): Observable<any> {

    if (Object.keys(customTask).length === 0) {
      /* if ('update' in customTask) {
        delete customTask.update;
      }
      if (customTask?.deletes) {
        delete customTask.deletes;
      }
      if (customTask?.id) {
        customTask.id = null;
      }
      if (customTask?.status) {
        customTask.status = 'CREATED';
      } */
      if ('update' in customTask) {
        delete customTask.update;
      }
      if ('deletes' in customTask) {
        delete customTask.deletes;
      }
      if ('id' in customTask) {
        customTask.id = null;
      }
      if ('status' in customTask) {
        customTask.status = 'CREATED';
      }
    }

    if (this.debug) {
      console.log('ApiService: createCustomTask(): customTask: ', customTask);
    }

    return this.http.post<any>(`${REST_ENDPOINT_URI}/${REST_API_CREATE_CUSTOM_TASK}`, { ...customTask }).pipe(
      catchError((response) => {
        if (this.debugErr) {
          console.log('ApiService: createCustomTask(): response: ', response);
        }
        return throwError(response.error);
      })
    );

  }

  readCustomTask(id: string): Observable<any> {

    if (this.debug) {
      console.log('ApiService: readCustomTask(): id: ', id);
    }

    return this.http.get<any>(`${REST_ENDPOINT_URI}/${REST_API_READ_CUSTOM_TASKS}/${id}`).pipe(
      catchError((response) => {
        if (this.debugErr) {
          console.log('ApiService: readCustomTask(): response: ', response);
        }
        return throwError(response.error);
      })
    );

  }

  readCustomTasks(): Observable<CustomTask[]> {

    return this.http.get<any>(`${REST_ENDPOINT_URI}/${REST_API_READ_CUSTOM_TASKS}`).pipe(
      catchError((response) => {
        if (this.debugErr) {
          console.log('ApiService: readCustomTasks(): response: ', response);
        }
        return throwError(response.error);
      })
    );

  }

  patchCustomTask(id: string, customTask: CustomTask): Observable<any> {

    if (Object.keys(customTask).length === 0) {
      /* if (customTask?.update) {
        delete customTask.update;
      }
      if (customTask?.deletes) {
        delete customTask.deletes;
      }
      if (customTask?.id) {
        customTask.id = null;
      }
      if (customTask?.status) {
        customTask.status = 'PATCHED';
      } */
      if ('update' in customTask) {
        delete customTask.update;
      }
      if ('deletes' in customTask) {
        delete customTask.deletes;
      }
      if ('id' in customTask) {
        customTask.id = null;
      }
      if ('status' in customTask) {
        customTask.status = 'PATCHED';
      }
    }

    if (this.debug) {
      console.log('ApiService: patchCustomTask(): customTask: ', customTask);
    }

    let param = '';

    if (id && id !== '') {
      param = '/' + id;
    }

    if (this.debug) {
      console.log('ApiService: patchCustomTask(): param: ', param);
    }

    return this.http.patch<any>(`${REST_ENDPOINT_URI}/${REST_API_PATCH_CUSTOM_TASK}${param}`, { ...customTask }).pipe(
      catchError((response) => {
        if (this.debugErr) {
          console.log('ApiService: patchCustomTask(): response: ', response);
        }
        return throwError(response.error);
      })
    );

  }

  updateCustomTask(customTask: CustomTask): Observable<any> {

    if (Object.keys(customTask).length === 0) {
      /* if (customTask?.update) {
        delete customTask.update;
      }
      if (customTask?.deletes) {
        delete customTask.deletes;
      }
      if (customTask?.id) {
        customTask.id = null;
      }
      if (customTask?.status) {
        customTask.status = 'UPDATE';
      } */
      if ('update' in customTask) {
        delete customTask.update;
      }
      if ('deletes' in customTask) {
        delete customTask.deletes;
      }
      if ('id' in customTask) {
        customTask.id = null;
      }
      if ('status' in customTask) {
        customTask.status = 'UPDATED';
      }
    }

    if (this.debug) {
      console.log('ApiService: updateCustomTask(): customTask: ', customTask);
    }

    return this.http.put<any>(`${REST_ENDPOINT_URI}/${REST_API_UPDATE_CUSTOM_TASK}`, { ...customTask }).pipe(
      catchError((response) => {
        if (this.debugErr) {
          console.log('ApiService: updateCustomTask(): response: ', response);
        }
        return throwError(response.error);
      })
    );

  }

  deleteCustomTask(id: string): Observable<any> {

    if (this.debug) {
      console.log('ApiService: deleteCustomTask(): id: ', id);
    }

    return this.http.delete<any>(`${REST_ENDPOINT_URI}/${REST_API_DELETE_CUSTOM_TASKS}/${id}`).pipe(
      catchError((response) => {
        if (this.debugErr) {
          console.log('ApiService: deleteCustomTask(): response: ', response);
        }
        return throwError(response.error);
      })
    );

  }

  deleteCustomTasks(): Observable<any> {

    return this.http.delete<any>(`${REST_ENDPOINT_URI}/${REST_API_DELETE_CUSTOM_TASKS}/all`).pipe(
      catchError((response) => {
        if (this.debugErr) {
          console.log('ApiService: deleteCustomTasks(): response: ', response);
        }
        return throwError(response.error);
      })
    );

  }

}
