import { Component, ViewChild, OnInit, OnDestroy  } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Store, select } from '@ngrx/store';
import { AppState } from './store/state/app.state';
import { Observable, of, Subject,  } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UIChart } from 'primeng/chart';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

import { DataService } from './core/services/data.service';
import { AgGridService } from './core/services/ag-grid.service';

import { ApiActions } from './store/actions/api.actions';
import { GetTransactions } from './store/actions/cash.action';

/* import {
  selectApiReadCustomTasks$,
  selectApiReadCustomTask$,
  selectApiReadCustomTasks
} from './store/selectors/api.selector'; */

import * as apiSelector from './store/selectors/api.selector';

import { CustomTask } from './core/models/CustomTask.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('agGrid', null) agGrid!: AgGridAngular;
  @ViewChild('chart', {static: false}) chart: UIChart;

  title = 'client-angular';
  message = 'Hello';
  barData$: Observable<any>;

  gridOptions = null;
  customTasks: CustomTask[];

  columnDefs: any = [];

  rowData: any = [];

  tasks$: any;

  debug = true;
  debugErr = true;

  /* readonly items$ = this.select(select(selectApiReadCustomTasks)); */
  private readonly destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private service: DataService,
    private agGridService: AgGridService,
  ) {
    // let tempData: any;
    // this.barData$ = of(this.barData);
    // this.service.wsSubject().subscribe(msg => {
    //   console.log('I received this message: ' + msg);
      // tempData = this.barData$;
      // tempData['value'].datasets[0].data = tempData['value'].datasets[0].data.filter(x=>x>15).map(
      //   x => x * 2
      // );
      // this.barData$ = tempData;
      // this.chart.reinit();
    // });
    this.store.dispatch(new GetTransactions({}));
  }

  ngOnInit() {

    if (this.debug) {
      console.log('AppComponent: ngOnInit()');
    }

    this.store.dispatch(ApiActions.readCustomTasks());

    this.store
    .pipe(apiSelector.selectApiReadCustomTasks$)
    .pipe(takeUntil(this.destroy$))
    .subscribe((customTasks: any) => {
      console.log('AppComponent: ngOnInit(): customTasks.entities: ', customTasks.entities);
      for (const customTask in customTasks.entities) {
        if (customTasks.entities.hasOwnProperty(customTask)) {
          this.rowData.push(customTasks.entities[customTask]);
        }
      }
      const rowData = this.agGridService.addExtraColumnsToTaskData(this.rowData);
      const columnDefs = this.agGridService.createAgGridColumnDefs(this.customTasks);
      if (this.debug) {
        console.log('AppComponent: ngOnInit(): this.rowData: ', this.rowData);
        console.log('AppComponent: ngOnInit(): this.columnDefs: ', this.columnDefs);
      }
      this.gridOptions = {
          getRowId: params => params.data.id,
          columnDefs,
          rowData,
          pagination: true,
          paginationPageSize: 4,
          defaultColDef: {
            resizable: true,
            sortable: true
          },
          onGridSizeChanged: (params) => {
            if (this.debug) {
              console.log('AgGridService initAgGrid(): onGridSizeChanged(): params: ', params);
            }
            if ('api' in this.agGrid.gridOptions) {
              this.agGrid.gridOptions.api.sizeColumnsToFit();
            }
          },
          onColumnResized: (params) => {
            if (this.debug) {
              console.log('AgGridService initAgGrid(): onColumnResized(): params: ', params);
            }
            // showButtons();
          }
      };
    });

    this.gridOptions.onGridReady = () => {
    };

  }

  sendToServer($event) {
    // this.subject.next(this.message);
    this.service.connect().error({code: 4000, reason: 'I think our app just broke!'});
    // this.service.wsSubject().complete();
    // this.service.wsSubject().next('Hi');
    // 1st way
    // const subject$ = webSocket( 'ws://localhost:8081');
    // 2nd way
    // const subject$ = webSocket({
    //        url: 'ws://localhost:8081',
    //        // Apply any transformation of your choice.
    //       deserializer: (e) => JSON.parse(e.data),
    //       // Apply any transformation of your choice.
    //       serializer: (value) => JSON.stringify(value),
    //       openObserver: {
    //         next: () => {
    //           console.log('Connetion established');
    //         }
    //        },
    //       closeObserver: {
    //         next() {
    //             const customError = { code: 4040, reason: 'Custom reason' };
    //             console.log(`code: ${customError.code}, reason: ${customError.reason}`);
    //         },
    //       },
    //    });

    // }
  }
  unsubscribe($event) {
    this.service.connect().unsubscribe();
  }

  subscribe($event) {
    this.service.connect().subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
