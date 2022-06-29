import axios from "axios";

const config = {
  headers: {
    "Content-type": "application-json",
  },
  baseURL: "http://localhost:3030",
  crossDomain: true,
};

export async function getData(page, rowsPerPage) {
  return await axios
    .get("/data-table?page=" + page + "&rowsPerPage=" + rowsPerPage, config)
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
