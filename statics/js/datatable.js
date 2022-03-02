
$(document).ready(function () {
  //varaible declaration here
  var paramsBeingEdited = undefined;

  function saveDataToServer(data) {
    var uri = "/api/v1/sitecontacts/";
    var type = "POST";
    if (data.id) {
      uri = uri + data.id;
      type = "PATCH";
    }
    return $.ajax({
      type: type,
      url: uri,
      data: data,
      dataType: 'multipart/form-data;',
      async: false,
      timeout: 30000,
      fail: function () {
        return true;
      },
      done: function (msg) {
        if (parseFloat(msg)) {
          return msg;
        } else {
          return msg;
        }
      }
    });
  }

  function deleteDataFromServer(id) {
    return $.ajax({
      type: 'DELETE',
      url: '/api/v1/sitecontacts/' + id,
      //data: data,
      //dataType: 'multipart/form-data;',
      async: false,
      timeout: 30000,
      fail: function () {
        return true;
      },
      done: function (msg) {
        if (parseFloat(msg)) {
          return false;
        } else {
          return true;
        }
      }
    });

  }


  var editorConfig = {
    "country": {
      "type": "dropdown",
      "options": [
        { key: "Russia", value: "Russia" },
        { key: "United States", value: "United States" },
        { key: "India", value: "India" },
        { key: "Bangladesh", value: "BanglaDesh" }
      ]
    },
    "date": {
      type: "datepicker"
    }
  }

  $('#saveButtonRow').on('click', () => {
    var dataFromForm = $("#editRowForm").serializeArray();
    var data = {};
    $.each(dataFromForm, function (i, field) {
      data[field.name] = field.value;
    });
    if (paramsBeingEdited !== undefined) {
      const result = saveDataToServer(data);
      if (result.readyState == 4) {
        toastr.success('Data saved', 'Server Says')
      }
      paramsBeingEdited.api.stopEditing(true);
      paramsBeingEdited.node.data = data;
      paramsBeingEdited.api.applyTransaction({
        update: [paramsBeingEdited.node.data]
      });
    } else {
      if(data) {
        const result = saveDataToServer(data);
        if (result.readyState == 4) {
          const dataFromServer = JSON.parse(result.responseText);
          toastr.success('Data saved', 'Server Says')
          gridOptions.api.applyTransaction({
            add: [dataFromServer],
            addIndex: 0,
          });
        }
      }
     
    }
    paramsBeingEdited = undefined;
    $("#editRowForm").html('');
    $('#editorModal').hide(500);
  })

  $('#popupCalcelButton').on('click', () => {
    if (paramsBeingEdited !== undefined) {
      paramsBeingEdited.api.stopEditing(true);
    }
    paramsBeingEdited = undefined;
    $("#editRowForm").html('');
    $('#editorModal').hide(500);
  })

  $('#closepopupbutton').on('click', () => {
    if (paramsBeingEdited !== undefined) {
      paramsBeingEdited.api.stopEditing(true);

    }
    paramsBeingEdited = undefined;
    $("#editRowForm").html('');
    $('#editorModal').hide(500);
  });

  $('#addNew').on('click', () => {
    console.log('adding a new');
    let data = {
      "region": "",
      "country": "",
      "site": "",
      "sitelead": "",
      "email": "",
      "sitedelegate": "",
      "facilitieslead": "",
      "securitylead": ""
    }

    createAndDisplayEditForm(data);
  });

  $('#exportToExcel').on('click', () => {
    alert('In Progress, will be ready')
  })


  function confirmAndDelete(message, params) {

    $('<div class="notification"></div>').appendTo('body')
      .html('<div><h6>' + message + '?</h6></div>')
      .dialog({
        modal: true,
        modal: true,
        resizable: false,
        //title: 'Delete message',
        zIndex: 10000,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        buttons: {
          Yes: function () {
            const result = deleteDataFromServer(params.node.data.id);
            if (result.readyState == 4) {
              params.api.applyTransaction({
                remove: [params.node.data]
              });
              toastr.success('Data deleted', 'Server Says')
            }
            $(this).dialog("close");
          },
          No: function () {
            $(this).dialog("close");
          }
        },
        close: function (event, ui) {
          $(this).remove();
        }
      });
  };

  function createAndDisplayEditForm(dataObject) {

    console.log(dataObject);
    $.each(dataObject, function (key, value) {
      var configEntry = editorConfig[key];
      if (configEntry !== undefined) {
        if (configEntry.type === 'dropdown') {
          //create a dropdown
          var div = $('<div><label class="label">' + key + '</label></div>');
          var selectElement = $('<select id="' + key + '" name="' + key + '" />').appendTo(div);
          //create options
          for (var val in configEntry.options) {
            $('<option value="' + configEntry.options[val].value + '">' + configEntry.options[val].key + '</option>').appendTo(selectElement);
          }
          selectElement.val(value);
          $('#editRowForm').append(div);
          //dropdown ends here
        } else if (configEntry.type === 'datepicker') {
          //date picker code starts here
          $('#editRowForm').append('<div><label class="label">' + key + '</label><input type="text" placeholder="' + key + '" name="' + key + '" value="' + value + '" id="datePicker1"/></div>');
          //date picker code ends here
          $("#datePicker1").datepicker();
        } else {
          //this is the default is config option code is yet not implemented
          $('#editRowForm').append('<div><label class="label">' + key + '</label><input type="text" placeholder="' + key + '" name="' + key + '" id="' + key + '" value="' + value + '"/></div>');
        }
      } else {
        $('#editRowForm').append('<div><label class="label">' + key + '</label><input type="text" placeholder="' + key + '" name="' + key + '" id="' + key + '" value="' + value + '"/></div>');
      }
    });
    $('#editorModal').show(500);
  }

  function actionCellRenderer(params) {
    let eGui = document.createElement("div");

    let editingCells = params.api.getEditingCells();
    // checks if the rowIndex matches in at least one of the editing cells
    let isCurrentRowEditing = editingCells.some((cell) => {
      return cell.rowIndex === params.node.rowIndex;
    });

    if (isCurrentRowEditing) {
      eGui.innerHTML = `
            <button  
              class="action-button update button is-primary"
              data-action="update">
                   update  
            </button>
  
            <button  
              class="action-button update button is-primary"
              data-action="popup">
                   edit in popup  
            </button>
  
            <button  
              class="action-button cancel button is-text"
              data-action="cancel">
                   cancel
            </button>
            `;
    } else {
      eGui.innerHTML = `
            <button 
              class="action-button edit button is-primary"  
              data-action="edit">
                 edit 
              </button>
            <button 
              class="action-button delete"
              data-action="delete">
                 delete
            </button>
            `;
    }

    return eGui;
  }

  var gridOptions = {
    suppressClickEdit: true,
    onCellClicked: (params) => {
      console.log('here on cell clicked');
      // Handle click event for action cells
      if (params.column.colId === "action" && params.event.target.dataset.action) {
        let action = params.event.target.dataset.action;

        if (action === "edit") {
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
          });
        }

        if (action === "delete") {
          confirmAndDelete("do you want to delete", params);
        }

        if (action === "update") {
          params.api.stopEditing(false);
          const result = saveDataToServer(params.data);
          if (result.readyState == 4) {
            toastr.success('Data saved', 'Server Says')
          }
        }

        if (action === "cancel") {
          params.api.stopEditing(true);
        }

        if (action === 'popup') {
          paramsBeingEdited = params;
          createAndDisplayEditForm(params.data);
        }
      }
    },

    onRowEditingStarted: (params) => {
      params.api.refreshCells({
        columns: ["action"],
        rowNodes: [params.node],
        force: true
      });
    },
    onRowEditingStopped: (params) => {
      params.api.refreshCells({
        columns: ["action"],
        rowNodes: [params.node],
        force: true
      });
    },
    editType: "fullRow",
    columnDefs: [
      { field: "id", minWidth: 350, sortable: true, filter: true },
      { field: "region", minWidth: 350, sortable: true },
      { field: "country", maxWidth: 150, sortable: true },
      { field: "site", maxWidth: 150, sortable: true },
      { field: "sitelead", maxWidth: 150, sortable: true },
      { field: "email", maxWidth: 100, sortable: true },
      { field: "sitedelegate", maxWidth: 100, sortable: true },
      { field: "facilitieslead", maxWidth: 100, sortable: true },
      { field: "securitylead", maxWidth: 100, sortable: true },
      {
        headerName: "action",
        minWidth: 350,
        cellRenderer: actionCellRenderer,
        editable: false,
        colId: "action"
      }
    ],
    defaultColDef: {
      editable: true
    },
    enableRangeSelection: true,
    allowContextMenuWithControlKey: true,
    domLayout: 'autoHeight'
  };

  var gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  agGrid
    .simpleHttpRequest({
      url: "http://localhost:8000/api/v1/sitecontacts"
    })
    .then(function (data) {
      gridOptions.api.setRowData(data);

      const allColumnIds = [];
      gridOptions.columnApi.getAllColumns().forEach((column) => {
        allColumnIds.push(column.getId());
      });
      gridOptions.columnApi.autoSizeColumns(allColumnIds, false);
    });
});