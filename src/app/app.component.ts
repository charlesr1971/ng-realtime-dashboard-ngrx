import { Component, ViewChild, OnInit, OnDestroy, Renderer2, Inject, ElementRef, AfterViewInit  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { webSocket } from 'rxjs/webSocket';
import { Store, select } from '@ngrx/store';
import { AppState } from './store/state/app.state';
import { Observable, of, Subject,  } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { UIChart } from 'primeng/chart';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';

import { DataService } from './core/services/data.service';
import { AgGridService } from './core/services/ag-grid.service';
import { UtilsService } from './core/services/utils.service';

import { ApiActions } from './store/actions/api.actions';
import { GetTransactions } from './store/actions/cash.action';

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

  debug = true;
  debugErr = true;

  private readonly destroy$ = new Subject<void>();
  private gridApi!: GridApi;

  constructor(
    private store: Store<AppState>,
    private service: DataService,
    private agGridService: AgGridService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private documentBody: Document,
    public elementRef: ElementRef,
    private utilsService: UtilsService
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
    //this.store.dispatch(new GetTransactions({}));
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
      this.rowData = [];
      for (const customTask in customTasks.entities) {
        if (customTasks.entities.hasOwnProperty(customTask)) {
          this.rowData.push(customTasks.entities[customTask]);
        }
      }
      const rowData = this.agGridService.addExtraColumnsToTaskData(this.rowData);
      const columnDefs = this.agGridService.createAgGridColumnDefs();
      this.rowData = rowData;
      try{
        this.createAgGrid(rowData);
      }
      catch(e) {
      }
      if (this.debug) {
        console.log('AppComponent: ngOnInit(): rowData: ', rowData);
        console.log('AppComponent: ngOnInit(): columnDefs: ', columnDefs);
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
              console.log('AppComponent: ngOnInit(): onGridSizeChanged(): params: ', params);
            }
            if ('api' in this.agGrid.gridOptions) {
              this.agGrid.gridOptions.api.sizeColumnsToFit();
            }
          },
          onColumnResized: (params) => {
            if (this.debug) {
              console.log('AppComponent: ngOnInit(): onColumnResized(): params: ', params);
            }
            // showButtons();
          }
      };
    });

    this.service.connect().pipe(
      map(
        result => {
          if (this.debug) {
            console.log('AppComponent: ngOnInit(): connect(): pipe: result: ', result);
          }
          return result;
        }
      )
    );

    this.service.connect().subscribe( (message) => {
      if (this.debug) {
        console.log('AppComponent: ngOnInit(): connect(): subscribe: message: ', message);
      }
      this.store.dispatch(ApiActions.readCustomTasks());
    });

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

  onGridReady(params: GridReadyEvent) {
    this.gridOptions.api.sizeColumnsToFit();
    const ag20 = this.documentBody.querySelector('#ag-20');
    if (ag20) {
      let addButton = this.renderer.createElement('button');
      // tslint:disable-next-line: max-line-length
      this.renderer.setAttribute(addButton, 'class', 'mdl-button mdl-js-ripple-effect mdl-button--raised mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored button-add');
      this.renderer.setAttribute(addButton, 'id', 'button-add');
      this.renderer.setAttribute(addButton, 'disabled', 'disabled');
      let addIcon = this.renderer.createElement('i');
      this.renderer.setAttribute(addIcon, 'class', 'material-icons');
      let newContent = this.renderer.createText('add');
      this.renderer.appendChild(addIcon, newContent);
      this.renderer.appendChild(addButton, addIcon);
      this.renderer.appendChild(ag20, addButton);
      addButton = this.renderer.createElement('button');
      // tslint:disable-next-line: max-line-length
      this.renderer.setAttribute(addButton, 'class', 'mdl-button mdl-js-ripple-effect mdl-button--raised mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--accent button-delete-all');
      this.renderer.setAttribute(addButton, 'id', 'button-delete-all');
      this.renderer.setAttribute(addButton, 'disabled', 'disabled');
      addIcon = this.renderer.createElement('i');
      this.renderer.setAttribute(addIcon, 'class', 'material-icons');
      newContent = this.renderer.createText('delete');
      this.renderer.appendChild(addIcon, newContent);
      this.renderer.appendChild(addButton, addIcon);
      this.renderer.appendChild(ag20, addButton);
      // componentHandler.upgradeDom();
      this.service.onOpenHasListener$.subscribe( (bool) => {
        if (this.debug) {
          console.log('AppComponent: ngOnInit(): onOpenHasListener$: bool: ', bool);
        }
        if (bool === true) {
          this.showButtons();
        }
      });
      const buttonAdd = document.querySelector('#button-add');
      if (buttonAdd) {
        this.renderer.listen(buttonAdd, 'click', () => {
          this.sendCreate();
        });
      }
      const buttonDeleteAll = document.querySelector('#button-delete-all');
      if (buttonDeleteAll) {
        this.renderer.listen(buttonDeleteAll, 'click', () => {
          // this.sendDeleteAll();
        });
      }
    }
    this.gridApi = params.api;
  }

  createAgGrid(data) {
	  const array = this.utilsService.sortArrayOfObjects(data,"id","asc","text");
    if (this.debug) {
      console.log('AppComponent: createAgGrid(): array: ', array);
    }
	  this.gridApi.setRowData(array);
    this.gridApi.redrawRows();
	}

  showButtons() {
    const buttonAdd = document.querySelector('#button-add');
    const buttonDeleteAll = document.querySelector('#button-delete-all');
    if (this.debug) {
      console.log('AppComponent: showButtons()');
    }
    if (buttonAdd) {
      const disabled =  this.documentBody.querySelector('#button-add').getAttribute('disabled');
      if (this.debug) {
        console.log('AppComponent: showButtons(): buttonAdd: disabled: ', disabled);
      }
      const hasDisabled = typeof disabled !== typeof undefined ? true : false;
      if (this.debug) {
        console.log('AppComponent: showButtons(): buttonAdd: hasDisabled: ', hasDisabled);
      }
      if (hasDisabled) {
        this.renderer.removeAttribute(buttonAdd, 'disabled');
        if (this.debug) {
          console.log('AppComponent: showButtons(): buttonAdd: ', buttonAdd);
        }
      }
    }
    if (buttonDeleteAll) {
      const disabled =  this.documentBody.querySelector('#button-delete-all').getAttribute('disabled');
      if (this.debug) {
        console.log('AppComponent: showButtons(): buttonDeleteAll: disabled: ', disabled);
      }
      const hasDisabled = typeof disabled !== typeof undefined ? true : false;
      if (this.debug) {
        console.log('AppComponent: showButtons(): buttonDeleteAll: hasDisabled: ', hasDisabled);
      }
      if (hasDisabled) {
        this.renderer.removeAttribute(buttonDeleteAll, 'disabled');
        if (this.debug) {
          console.log('AppComponent: showButtons(): buttonDeleteAll: ', buttonDeleteAll);
        }
      }
    }
  }

  sendCreate() {
    const customTask = this.service.createCustomTask();
    this.store.dispatch(ApiActions.createCustomTask({customTask}));
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
