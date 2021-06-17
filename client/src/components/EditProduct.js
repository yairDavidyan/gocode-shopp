import * as React from "react";
import { useContext } from "react";

import { DataGrid, getThemePaletteMode } from "@material-ui/data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from "@material-ui/x-grid-data-generator";
import CartContext from "./CartContext";
import { createMuiTheme, makeStyles } from "@material-ui/core";
// const defaultTheme = createMuiTheme();

// const useStyles = makeStyles(
//   (theme) => {
//     const backgroundColor =
//       getThemePaletteMode(theme.palette) === "dark"
//         ? "#376331"
//         : "rgb(217 243 190)";
//     return {
//       root: {
//         "& .MuiDataGrid-cellEditable": {
//           backgroundColor,
//         },
//       },
//     };
//   },
//   { defaultTheme }
// );
export default function EditProduct() {
  //   const classes = useStyles();

  const { products } = useContext(CartContext);
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        // isCellEditable={(params) => params.products.price % 2 !== 0}
        getRowId={(row) => row._id}
        rows={products}
        columns={columns}
        // className={classes.root}
      />
    </div>
  );
}

const columns = [
  {
    field: "image",
    headerName: "image",
    type: "image",
    width: 180,
    editable: true,
  },

  { field: "_id", headerName: "Id", editable: false },
  {
    field: "title",
    headerName: "name",
    type: "string",
    width: 180,
    editable: true,
  },
  {
    field: "price",
    headerName: "price",
    type: "number",
    width: 120,
    editable: true,
  },
  {
    field: "description",
    headerName: "description",
    type: "string",
    width: 220,
    editable: true,
  },
  {
    field: "category",
    headerName: "category",
    type: "string",
    width: 220,
    editable: true,
  },
];
