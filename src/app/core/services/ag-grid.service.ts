import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgGridService {

  gridOptions: any;

  columnCentered = {
    headerClass: 'text-center',
    cellStyle: {
      textAlign: 'center'
    }
  };

  debug = true;
  debugErr = true;

  constructor() { }

  createTaskData(data, obj) {
    if (!('update' in obj)) {
      obj.update = '<i class="material-icons">update</i>';
    }
    data.push(obj);
    const array = data;
    return array;
  }

  readTaskData(data, id) {
    const array = data.filter( (obj) => {
      return obj.id.toLowerCase() === id.toLowerCase();
    });
    return array;
  }

  readTaskDataCreate(data, id) {
    const array = data.filter( (obj) => {
      return obj.id.toLowerCase() === id.toLowerCase();
    });
    return array;
  }

  updateTaskData(data, id) {
    const array = data.map( (obj) => {
    if (obj.id.toLowerCase() === id.toLowerCase()) {
      obj.status = 'updated';
    }
    return obj;
    });
    return array;
  }

  addExtraColumnsToTaskData(data) {
    const array = data.map( (obj) => {
      obj.update = '<i class="material-icons">update</i>';
      obj.deletes = '<i class="material-icons">delete_outline</i>';
      return obj;
    });
    return array;
  }

  getObjectkeys(obj) {
    return Object.keys(obj);
  }

  createAgGridColumnDefs() {
    const columnDefs = [];
    columnDefs.push({
      field: 'id',
      suppressSizeToFit: false,
      sortable: true,
      unSortIcon: true
    });
    columnDefs.push({
      field: 'name',
      suppressSizeToFit: false,
      sortable: true,
      unSortIcon: true
    });
    columnDefs.push({
      field: 'assignee',
      suppressSizeToFit: false,
      sortable: true,
      unSortIcon: true
    });
    columnDefs.push({
      field: 'created',
      suppressSizeToFit: false,
      sortable: true,
      unSortIcon: true
    });
    columnDefs.push({
      field: 'update',
      cellRenderer(params) {
        return '<a href="javascript:void(0);" onclick="sendUpdate(\'' + params.data.id + '\')">' + params.value + '</a>';
      },
      headerClass: 'update-header-text-center',
      cellStyle: {
        textAlign: 'center',
        top: '8px'
      },
      suppressSizeToFit: false
    });
    columnDefs.push({
      field: 'deletes',
      cellRenderer(params) {
        return '<a href="javascript:void(0);" onclick="sendDelete(\'' + params.data.id + '\')">' + params.value + '</a>';
      },
      headerClass: 'update-header-text-center',
      cellStyle: {
        textAlign: 'center',
        top: '8px'
      },
      suppressSizeToFit: false
    });
    columnDefs.push({
      field: 'status',
      headerClass: 'update-header-text-center',
      cellStyle: {
        textAlign: 'center'
      },
      suppressSizeToFit: false,
      sortable: true,
      unSortIcon: true
    });
    if (this.debug) {
      console.log('AgGridService createAgGridColumnDefs(): columnDefs: ', columnDefs);
    }
    return columnDefs;
  }

  /* initAgGrid(data) {
    return {
      gridOptions: null,
      init(el) {
        const rowData = data;
        this.gridOptions = {
          getRowId: params => params.data.id,
          columnDefs: this.createAgGridColumnDefs(data),
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
            if ('api' in this.gridOptions) {
              this.gridOptions.api.sizeColumnsToFit();
            }
          },
          onColumnResized: (params) => {
            if (this.debug) {
              console.log('AgGridService initAgGrid(): onColumnResized(): params: ', params);
            }
            // showButtons();
          }
        };
        // const grid = new agGrid.Grid(el, this.gridOptions);
        this.gridOptions.onGridReady = () => {
          this.gridOptions.api.sizeColumnsToFit();
          const ag20 = document.querySelector('#ag-20');
          if (ag20) {
            let addButton = document.createElement('button');
            // tslint:disable-next-line: max-line-length
            addButton.setAttribute('class', 'mdl-button mdl-js-ripple-effect mdl-button--raised mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored button-add');
            addButton.setAttribute('id', 'button-add');
            addButton.setAttribute('disabled', 'disabled');
            addButton.setAttribute('onclick', 'sendCreate()');
            let addIcon = document.createElement('i');
            addIcon.setAttribute('class', 'material-icons');
            let newContent = document.createTextNode('add');
            addIcon.appendChild(newContent);
            addButton.appendChild(addIcon);
            ag20.appendChild(addButton);
            addButton = document.createElement('button');
            // tslint:disable-next-line: max-line-length
            addButton.setAttribute('class', 'mdl-button mdl-js-ripple-effect mdl-button--raised mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--accent button-delete-all');
            addButton.setAttribute('id', 'button-delete-all');
            addButton.setAttribute('disabled', 'disabled');
            addButton.setAttribute('onclick', 'sendDeleteAll()');
            addIcon = document.createElement('i');
            addIcon.setAttribute('class', 'material-icons');
            newContent = document.createTextNode('delete');
            addIcon.appendChild(newContent);
            addButton.appendChild(addIcon);
            ag20.appendChild(addButton);
            // componentHandler.upgradeDom();
          }
          if (this.debug) {
            console.log('AgGridService initAgGrid(): onGridReady()');
          }
        };
      },
      createAgGrid() {
        const array = this.sortArrayOfObjects(data, 'id', 'asc', 'text');
        this.gridOptions.api.setRowData(array);
      },
      updateAgGrid(id) {
        if (this.debug) {
          console.log('AgGridService updateAgGrid(): id: ', id);
        }
        const rowNode = this.gridOptions.api.getRowNode(id);
        if (this.debug) {
          console.log('AgGridService updateAgGrid(): rowNode: ', rowNode);
        }
        rowNode.setDataValue('status', 'updated');
      }
    };
  } */


}
