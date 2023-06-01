import "./App.css";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

import { DATA } from "./data";
import useDarkMode from "./useDarkMode";

function App() {
  const [gridApi, setGridApi] = useState();
  const { isDark, setDarkMode, setLightMode } = useDarkMode();
  const rowData = DATA;

  const columns = [
    {
      headerName: "Make",
      field: "make",
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { headerName: "Price", field: "price" },
    { headerName: "Model", field: "model" },
    { headerName: "Date", field: "date" },
  ];

  const defColumnDefs = { flex: 1, filter: true };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  return (
    <div className="App">
      <h2 align="center">Ag Grid with React</h2>
      <p align="center">Theme Change (Custom Hook) in AG Grid</p>
      <div>
        Mode : <button onClick={setDarkMode}>Dark mode</button>
        <button onClick={setLightMode}>Light Mode</button>
      </div>
      <div
        className={isDark ? "ag-theme-alpine-dark" : "ag-theme-alpine"}
        style={{ height: 600 }}
      >
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
