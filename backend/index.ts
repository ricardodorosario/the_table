import express from "express";

const app = express();
const port = 3030;

const rows = [
  [1, "Hello", "World", "10/10/2020"],
  [2, "Good morning", "PLanet", "11/10/2020"],
  [3, "Good bye", "World", "12/10/2020"],
  [4, "Bye", "Neighbour", "13/10/2020"],
  [5, "Hello", "World", "10/10/2020"],
  [6, "Good morning", "PLanet", "11/10/2020"],
  [7, "Good bye", "World", "12/10/2020"],
  [8, "Bye", "Neighbour", "13/10/2020"],
  [9, "Hello", "World", "10/10/2020"],
  [10, "Good morning", "PLanet", "11/10/2020"],
  [11, "Good bye", "World", "12/10/2020"],
  [12, "Bye", "Neighbour", "13/10/2020"],
  [13, "Hello", "World", "10/10/2020"],
  [14, "Good morning", "PLanet", "11/10/2020"],
  [15, "Good bye", "World", "12/10/2020"],
  [16, "Bye", "Neighbour", "13/10/2020"],
  [17, "Hello", "World", "10/10/2020"],
  [18, "Good morning", "PLanet", "11/10/2020"],
  [19, "Good bye", "World", "12/10/2020"],
  [20, "Bye", "Neighbour", "13/10/2020"],
  [21, "Hello", "World", "10/10/2020"],
  [22, "Good morning", "PLanet", "11/10/2020"],
  [23, "Good bye", "World", "12/10/2020"],
  [24, "Bye", "Neighbour", "13/10/2020"],
  [25, "Hello", "World", "10/10/2020"],
  [26, "Good morning", "PLanet", "11/10/2020"],
  [27, "Good bye", "World", "12/10/2020"],
  [28, "Bye", "Neighbour", "13/10/2020"],
  [29, "Hello", "World", "10/10/2020"],
  [30, "Good morning", "PLanet", "11/10/2020"],
  [31, "Good bye", "World", "12/10/2020"],
  [32, "Bye", "Neighbour", "13/10/2020"],
  [33, "Hello", "World", "10/10/2020"],
  [34, "Good morning", "PLanet", "11/10/2020"],
  [35, "Good bye", "World", "12/10/2020"],
  [36, "Bye", "Neighbour", "13/10/2020"],
  [37, "Hello", "World", "10/10/2020"],
  [38, "Good morning", "PLanet", "11/10/2020"],
  [39, "Good bye", "World", "12/10/2020"],
  [40, "Bye", "Neighbour", "13/10/2020"],
];

const columns = ["Id", "Code", "Name", "Date"];

const infos = { totalRows: rows.length, selectedPage: 0 };

app.get("/data-table", (req, res) => {
  console.log(req.query.page);
  res.header("Access-Control-Allow-Origin", "*");
  res.send({
    rows: rows.slice(
      Number(req.query.page) * Number(req.query.rowsPerPage),
      Number(req.query.page) * Number(req.query.rowsPerPage) +
        Number(req.query.rowsPerPage)
    ),
    columns,
    infos: Object.assign(infos, { selectedPage: req.query.page }),
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
