import { Injectable, Inject } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';
export const WS_ENDPOINT = environment.wsEndpoint;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private socket$: WebSocketSubject<any>;

  private onOpenHasListener: BehaviorSubject<any> = new BehaviorSubject<any>(
    false
  );
  onOpenHasListener$ = this.onOpenHasListener.asObservable();

  debug = true;
  debugErr = true;

  constructor() {}

  public connect(): WebSocketSubject<any> {
    const that = this;
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket({
        url: WS_ENDPOINT,
        openObserver: {
          next(closeEvent) {
            that.setOnOpenHasListener(true);
          },
        },
      });
    }
    return this.socket$;
  }

  public dataUpdates$() {
    return this.connect().asObservable();
  }

  closeConnection() {
    this.connect().complete();
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  setOnOpenHasListener(onOpenHasListener: boolean): void {
    this.onOpenHasListener.next(onOpenHasListener);
  }

  createCustomTask() {
    /* const rand = randomIntInc(0, taskDataCreate.length - 1);
    if (this.debug) {
      console.log('websocket.js: sendCreate(): rand: ', rand);
    }
    const obj = taskDataCreate[rand];
    if (this.debug) {
      console.log('websocket.js: sendCreate(): obj: ', obj);
    }
    const array = [obj];
    if (Array.isArray(array) && array.length > 0) {
      if (this.debug) {
        console.log('websocket.js: sendCreate(): array: ', array);
      }
      xhrCreate(array[0]);
    } */
  }
}
