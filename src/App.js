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
    params.api.getToolPanelInstance("filters").expandFilters("make");
  };

  return (
    <div className="App">
      <h2 align="center">Ag Grid with React</h2>
      <p align="center">Sidebar toolpanel with customization in AG Grid</p>
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
                labelKey: "columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel",
                toolPanelParams: {
                  suppressRowGroups: true,
                  suppressValues: true,
                  suppressPivots: false,
                  suppressPivotMode: true,
                  suppressColumnFilter: false,
                  suppressColumnSelectAll: false,
                  suppressColumnExpandAll: false,
                },
              },
              {
                id: "filters",
                labelDefault: "Filters",
                labelKey: "filters",
                iconKey: "filter",
                toolPanel: "agFiltersToolPanel",
                toolPanelParams: {
                  suppressExpandAll: true,
                  suppressFilterSearch: false,
                },
              },
              {
                id: "quickSearch",
                labelDefault: "Quick",
                labelKey: "quickSearch",
                iconKey: "menu",
                toolPanel: () => (
                  <div>
                    <h4>Global Search</h4>
                    <input
                      placeholder="Search..."
                      type="search"
                      style={{
                        width: 190,
                        height: 35,
                        outline: "none",
                        border: "none",
                        borderBottom: `1px #181616 solid`,
                        padding: `0 5px`,
                      }}
                      onChange={(e) =>
                        gridApi.api.setQuickFilter(e.target.value)
                      }
                    />
                  </div>
                ),
              },
            ],
            position: "right",
            defaultToolPanel: "quickSearch",
          }}
        />
      </div>
    </div>
  );
}

export default App;
