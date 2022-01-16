import './App.css';
import { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App = () => {

  const [rowdata, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  //cell editing callbacks
  const onCellValueChanged = (event) => {
    console.log('data after changes is: ', event.data);

    var csrftoken = getCookie('csrftoken');
    var headers = new Headers();
    headers.append('X-CSRFToken', csrftoken);

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(event.data),
      credentials: 'include'
    };
    fetch(`/api/v1/returntoview/${event.data.id}`, requestOptions)
      .then(response => response.json())
      .then(data => console.log('data saved-------->'));
  };


  const fetchDataWithPagination = async (startIndex, endIndex) => {
    const response = await fetch(`/api/v1/returntoview?start=${startIndex}&end=${endIndex}`);
    const data = await response.json();
    if (data && data.length > 0) {
      console.log(data)
      setRowData([...data]);
    }
  }

  useEffect(() => {
    fetchDataWithPagination(0, 10);
  }, []);


  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100vW' }}
    >
      <AgGridReact
        rowData={rowdata}
        enableRangeSelection={true}
        onGridReady={onGridReady}
        onCellValueChanged={onCellValueChanged}
      >
        <AgGridColumn field="id" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="geography" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
        <AgGridColumn field="location" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
        <AgGridColumn field="additionalPart" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
        <AgGridColumn field="comments" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
        <AgGridColumn field="fullyEquipedMonitor" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
        <AgGridColumn field="fullyEquipedMonitorPercent" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
        <AgGridColumn field="toMr" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
        <AgGridColumn field="managerResponsible" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
        <AgGridColumn field="meaws" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
        <AgGridColumn field="missingParts" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
        <AgGridColumn field="mr" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
        <AgGridColumn field="numberOfDesk" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
        <AgGridColumn field="text" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
        <AgGridColumn field="targetToFullyequipPercent" sortable={true} filter={true} editable={true} isPopup={true}></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default App;
