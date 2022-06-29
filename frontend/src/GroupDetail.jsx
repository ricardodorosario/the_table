import React from "react";
import "./App.css";
import Content from "./components/content";
import Footer from "./components/footer";
import Header from "./components/header";
import Button from "@mui/material/Button";

function GroupDetail(props) {
  function calcQuantity() {
    let count = 0;
    props.rows.forEach((row) => {
      if (row[4] === props.groupNumber) {
        count++;
      }
    });
    return count;
  }

  function getCreationDate() {
    const res = props.rows.find((row) => row[4] === props.groupNumber);
    if (res) {
      return res[5];
    }
  }

  return (
    <div className="App">
      <Header>The Table - Group Details</Header>
      <Content>
        <div className="panel">
          <div>Group number: {props.groupNumber}</div>
          <br />
          <div>Quantity of records: {calcQuantity()}</div>
          <br />
          <div>Creation date: {getCreationDate()}</div>
          <br />
        </div>
        <Button onClick={props.close} variant="contained">
          Back
        </Button>
      </Content>
      <Footer></Footer>
    </div>
  );
}

export default GroupDetail;
