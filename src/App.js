import "./App.css";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { DATA } from "./data";
import DeatailsComponent from "./Details";

function App() {
  const [gridApi, setGridApi] = useState();
  const rowData = DATA;

  const columns = [
    {
      headerName: "Make",
      field: "make",
      cellRenderer: "agGroupCellRenderer",
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { headerName: "Price", field: "price" },
    { headerName: "Model", field: "model" },
    { headerName: "Date", field: "date" },
  ];

  const defColumnDefs = { flex: 1 };

  const onGridReady = (params) => {
    setGridApi(params);
  };
  const onFirstDataRendered = () => {
    // for all rows expanded
    // gridApi.api.forEachNode((node) => {
    //   node.setExpanded(true);
    // });

    // for specific row expand
    const row2 = gridApi.api.getDisplayedRowAtIndex(1);
    row2.setExpanded(true);
    // gridApi.api.getDisplayedRowAtIndex(0).setExpanded(true);
  };

  return (
    <div className="App">
      <h2 align="center">Ag Grid with React</h2>
      <p align="center">Details Row Panel in AG Grid</p>
      <div className="ag-theme-material" style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defColumnDefs}
          onGridReady={onGridReady}
          masterDetail={true}
          detailCellRenderer={(props) => <DeatailsComponent {...props} />}
          detailRowHeight={300}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </div>
  );
}

export default App;
