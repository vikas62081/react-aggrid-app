import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { DATA } from "./data";
import { clearLocalStorage, getLocalStorage, setLocalStorage } from "./utility";

function App() {
  const [gridApi, setGridApi] = useState();
  const [rowData, setRowData] = useState();

  const columns = [
    { field: "athlete", minWidth: 170 },
    { field: "age" },
    { field: "country" },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data) => setRowData(data));
  }, []);
  const defColumnDefs = { flex: 1, filter: true, sortable: true };

  const onGridReady = (params) => {
    setGridApi(params);
    restoreState(params);
  };

  const saveState = () => {
    const colState = gridApi.columnApi.getColumnState();
    setLocalStorage(colState);
    closeSidebarToolpanel();
    console.log("column state saved");
  };

  const restoreState = (params) => {
    const colState = getLocalStorage();
    if (!colState) {
      console.log("no columns state to restore by, you must save state first");
      return;
    }
    params.columnApi.applyColumnState({
      state: colState,
      applyOrder: true,
    });
    closeSidebarToolpanel();
    console.log("column state restored");
  };

  const resetState = () => {
    gridApi.columnApi.resetColumnState();
    clearLocalStorage();
    closeSidebarToolpanel();
    console.log("column state reset");
  };

  const closeSidebarToolpanel = () => [gridApi.api.closeToolPanel()];
  return (
    <div className="App">
      <h2 align="center">Ag Grid with React</h2>
      <p align="center">
        Manage Column state for Better User Experience in AG Grid
      </p>

      <div className="ag-theme-material" style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defColumnDefs}
          onGridReady={onGridReady}
          sideBar={{
            toolPanels: [
              {
                id: "columns",
                labelDefault: "Columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel",
              },
              {
                id: "save",
                labelDefault: "Save",
                iconKey: "menu",
                toolPanel: () => (
                  <div style={{ marginTop: 20 }}>
                    <button onClick={saveState}>Save State</button>
                    <button onClick={() => restoreState(gridApi)}>
                      Restore State
                    </button>
                    <button onClick={resetState}>Reset State</button>
                  </div>
                ),
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default App;
