import React, { Fragment } from "react";
import { Waypoint } from "react-waypoint";
import MUIDataTable from "mui-datatables";
import Chip from "@mui/material/Chip";

export default function Table(props) {
  const { rowsState, setNewRowsState, menu, columnsState, openDetail } = props;
  const options = {
    responsive: "standard",
    selectableRows: "multiple",
    customToolbarSelect: menu,
    pagination: false,
    filter: true,
    filterType: "dropdown",
  };

  columnsState[0] = {
    name:
      typeof columnsState[0] === "object"
        ? columnsState[0].name
        : columnsState[0],
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowIndex = tableMeta.rowIndex;
        let newRow;
        if (rowIndex === rowsState.length - 10) {
          newRow = (
            <React.Fragment>
              <Waypoint
                onEnter={() => {
                  setNewRowsState(true);
                }}
                onLeave={() => {
                  setNewRowsState(false);
                }}
              />
              {value}*
            </React.Fragment>
          );
        } else {
          newRow = <Fragment>{value}</Fragment>;
        }
        if (rowsState[rowIndex][4]) {
          newRow = (
            <Fragment>
              {newRow}
              <Chip
                className="chip"
                label={"Group " + rowsState[rowIndex][4]}
                onClick={() => openDetail(rowsState[rowIndex][4])}
              ></Chip>
            </Fragment>
          );
        }

        return newRow;
      },
    },
  };

  return (
    <div className="table">
      <MUIDataTable data={rowsState} columns={columnsState} options={options} />
    </div>
  );
}
