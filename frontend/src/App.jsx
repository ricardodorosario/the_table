import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header";
import Content from "./components/content";
import Footer from "./components/footer";
import Table from "./components/table";
import { getData } from "./App.service";
import Dialog from "@mui/material/Dialog";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import GroupDetail from "./GroupDetail";

function App() {
  const rowsPerPage = 20;
  const [rowsState, setRowsState] = useState();
  const [newRowsState, setNewRowsState] = useState(false);
  const [columnsState, setColumnsState] = useState();
  const [groupNumberState, setGroupNumberState] = useState("");
  const [selectedRowsState, setSelectedRowsState] = useState();
  const [openModalSelectGroupState, setOpenModalSelectGroupState] =
    useState(false);
  const [openModalGroupDetailState, setOpenModalGroupDetailState] =
    useState(false);

  function getDataPage(page) {
    getData(page, rowsPerPage)
      .then((data) => {
        setRowsState(data.rows);
        setColumnsState(data.columns);
      })
      .catch();
  }

  function menu(selectedRows, displayData, setSelectedRows) {
    return (
      <div className={"custom-toolbar-select"}>
        <Tooltip title={"Add Group"}>
          <IconButton onClick={() => preAddGroup(selectedRows)}>
            <GroupAddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Remove Group"}>
          <IconButton onClick={() => removeGroup(selectedRows)}>
            <GroupRemoveIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }

  function openDetail(group) {
    setGroupNumberState(group);
    setOpenModalGroupDetailState(true);
  }
  function closeDetail(group) {
    setGroupNumberState("");
    setOpenModalGroupDetailState(false);
  }

  function preAddGroup(selectedRows) {
    setSelectedRowsState(selectedRows);
    setOpenModalSelectGroupState(true);
  }

  function addGroup() {
    setRowsState((rows) => {
      selectedRowsState.data.forEach((selectedRow) => {
        rows[selectedRow.index] = Object.assign(rows[selectedRow.index], {
          4: groupNumberState,
          5: new Date().toDateString(),
        });
      });
      return [...rows];
    });
    setGroupNumberState("");
    setSelectedRowsState();
    setOpenModalSelectGroupState(false);
  }

  function removeGroup(selectedRows) {
    setRowsState((rows) => {
      selectedRows.data.forEach((selectedRow) => {
        rows[selectedRow.index] = Object.assign(rows[selectedRow.index], {
          4: null,
        });
      });
      return [...rows];
    });
  }

  useEffect(() => {
    getDataPage(0);
  }, []);

  useEffect(() => {
    if (newRowsState) {
      setRowsState([...rowsState, ...rowsState]);
      setNewRowsState(false);
    } else {
    }
  }, [rowsState, newRowsState]);

  if (columnsState) {
    return (
      <div className="App">
        <Header>The Table</Header>
        <Content>
          <Table
            rowsState={rowsState}
            columnsState={columnsState}
            setNewRowsState={setNewRowsState}
            menu={menu}
            openDetail={openDetail}
            closeDetail={closeDetail}
          ></Table>
          <Dialog
            open={openModalSelectGroupState}
            onClose={() => setOpenModalSelectGroupState(false)}
          >
            <InputLabel title="Group Number" htmlFor="inputGroupNumberState">
              Group Number
            </InputLabel>
            <Input
              id="inputGroupNumberState"
              value={groupNumberState}
              onChange={(val) => {
                var numberPattern = /\d+/g;
                setGroupNumberState(
                  val.target.value
                    ? val.target.value.match(numberPattern).join("")
                    : ""
                );
              }}
            ></Input>
            <Button
              onClick={() => {
                addGroup();
              }}
              disabled={!groupNumberState}
            >
              Confirm
            </Button>
          </Dialog>
          <Dialog
            className="group-modal"
            open={openModalGroupDetailState}
            onClose={() => setOpenModalGroupDetailState(false)}
            aria-expanded="true"
          >
            <GroupDetail
              close={closeDetail}
              rows={rowsState}
              groupNumber={groupNumberState}
            ></GroupDetail>
          </Dialog>
        </Content>
        <Footer></Footer>
      </div>
    );
  } else {
    return "Loading...";
  }
}

export default App;
