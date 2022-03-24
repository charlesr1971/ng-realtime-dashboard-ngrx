import { Component, ViewChild, OnInit, OnDestroy, Renderer2, Inject, ElementRef,  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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

  // $onOpenHasListener = false;

  debug = true;
  debugErr = true;

  /* readonly items$ = this.select(select(selectApiReadCustomTasks)); */
  private readonly destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private service: DataService,
    private agGridService: AgGridService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private documentBody: Document,
    public elementRef: ElementRef
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

    this.service.onOpenHasListener$.subscribe( (bool) => {
      if (this.debug) {
        console.log('AppComponent: ngOnInit(): onOpenHasListener$: bool: ', bool);
      }
      if (bool === true) {
        this.showButtons();
      }
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

  onGridReady($event) {
    this.gridOptions.api.sizeColumnsToFit();
    const ag20 = this.documentBody.querySelector('#ag-20');
    if (ag20) {
      let addButton = this.renderer.createElement('button');
      // tslint:disable-next-line: max-line-length
      this.renderer.setAttribute(addButton, 'class', 'mdl-button mdl-js-ripple-effect mdl-button--raised mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored button-add');
      this.renderer.setAttribute(addButton, 'id', 'button-add');
      this.renderer.setAttribute(addButton, 'disabled', 'disabled');
      this.renderer.setAttribute(addButton, 'onclick', 'sendCreate()');
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
      this.renderer.setAttribute(addButton, 'onclick', 'sendDeleteAll()');
      addIcon = this.renderer.createElement('i');
      this.renderer.setAttribute(addIcon, 'class', 'material-icons');
      newContent = this.renderer.createText('delete');
      this.renderer.appendChild(addIcon, newContent);
      this.renderer.appendChild(addButton, addIcon);
      this.renderer.appendChild(ag20, addButton);
      // componentHandler.upgradeDom();
    }
  }

  showButtons() {
    const buttonAdd = document.querySelector('#button-add');
    const buttonDeleteAll = document.querySelector('#button-delete-all');
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
    // this.store.dispatch(ApiActions.createCustomTask({}));
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
