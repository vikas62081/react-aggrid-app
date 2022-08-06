import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { DATA } from "./data";

function App() {
  const [gridApi, setGridApi] = useState();
  const rowData = DATA;

  const columns = [
    {
      headerName: "Make",
      field: "make",
    },
    { headerName: "Price", field: "price" },
    { headerName: "Model", field: "model" },
    { headerName: "Date", field: "date" },
  ];

  const defColumnDefs = { flex: 1 };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  return (
    <div className="App">
      <h2 align="center">Ag Grid with React</h2>
      <p align="center">Details Row Panel in AG Grid</p>
      <div className="ag-theme-material" style={{ height: 400 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defColumnDefs}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}

export default App;
