import React, { createRef, useContext, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import CartContext from "./CartContext";
import EditIcon from "@material-ui/icons/Edit";
import { DataGrid } from "@material-ui/data-grid";
import { Button, Fade, Modal, TextField } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  { id: "title", numeric: true, disablePadding: false, label: "Name" },
  { id: "category", numeric: true, disablePadding: false, label: "Category" },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  { id: "image", numeric: true, disablePadding: false, label: "Image" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    selected,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  selected: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const EnhancedTableToolbar = (props) => {
  const {
    setProducts,
    setTotalProducts,
    setTotalFilter,
    setProductsFilter,
    setMinMax,
    setValue,
    calMin,
    calMax,
    categories,
    products,
  } = useContext(CartContext);

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  let textInputPrice = createRef();
  let textInputName = createRef();
  let textInputDes = createRef();
  let textInputUrl = createRef();
  let categoryRef = createRef();

  const classes = useToolbarStyles();
  const { numSelected, selected } = props;
  function deleteProduct() {
    selected.map((el) => {
      fetch(`/api/product/${el}`, {
        method: "DELETE",
      }).then(
        fetch("/api/product")
          .then((res) => res.json())
          .then(
            (data) => (
              setProducts(data),
              setTotalFilter((prev) => prev - 1),
              setTotalProducts((prev) => prev - 1),
              setProductsFilter(data),
              setMinMax(data),
              setValue([calMin(data), calMax(data)])
            )
          )
      );
    });
  }

  function update(id) {
    const updateProduct = {
      title: textInputName.current.value,
      price: +textInputPrice.current.value,
      description: textInputDes.current.value,
      //    category: categoryRef.current.value,
      image: textInputUrl.current.value,
      amount: 0,
    };
    fetch(`/api/product/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateProduct),
    }).then(
      fetch("/api/product")
        .then((res) => res.json())
        .then(
          (data) => (
            setProducts(data),
            setProductsFilter(data),
            setMinMax(data),
            setValue([calMin(data), calMax(data)])
          )
        )
    );
    setOpen(false);
  }
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton onClick={() => deleteProduct()} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="edit">
            <IconButton
              onClick={() =>
                numSelected === 1
                  ? setOpen(true)
                  : alert("select just one please")
              }
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <div style={{ display: "grid", justifyContent: "center" }}>
                  <h2 id="transition-modal-title">add product</h2>

                  <select
                    style={{ marginBottom: "0px" }}
                    className="selectCategory"
                    Ref={categoryRef}
                    value={products
                      .map((el) => {
                        if (el._id === selected[0]) {
                          return el.category;
                        }
                      })
                      .join("")}
                    //  onChange={(e) => change(e.target.value)}
                  >
                    <option aria-label="None" value="" />

                    {categories.map((categories) => (
                      <option value={categories} key={categories}>
                        {categories}
                      </option>
                    ))}
                  </select>
                  <TextField
                    autoComplete="off"
                    inputRef={textInputUrl}
                    id="standard-basic1"
                    // label="url"
                    defaultValue={products
                      .map((el) => {
                        if (el._id === selected[0]) {
                          return el.image;
                        }
                      })
                      .join("")}
                  />

                  <TextField
                    inputRef={textInputName}
                    autoComplete="off"
                    id="standard-basic2"
                    label="name"
                    defaultValue={products
                      .map((el) => {
                        if (el._id === selected[0]) {
                          return el.title;
                        }
                      })
                      .join("")}
                  />
                  <TextField
                    inputRef={textInputPrice}
                    autoComplete="off"
                    id="standard-basic3"
                    label="price"
                    defaultValue={products
                      .map((el) => {
                        if (el._id === selected[0]) {
                          return el.price;
                        }
                      })
                      .join("")}
                  />
                  <TextField
                    inputRef={textInputDes}
                    autoComplete="off"
                    id="standard-basic4"
                    label="des"
                    defaultValue={products
                      .map((el) => {
                        if (el._id === selected[0]) {
                          return el.description;
                        }
                      })
                      .join("")}
                  />
                </div>
                <Button
                  style={{ position: "relative", top: "10px", left: "25%" }}
                  onClick={() =>
                    update(
                      products
                        .map((el) => {
                          if (el._id === selected[0]) {
                            return el._id;
                          }
                        })
                        .join("")
                    )
                  }
                  variant="outlined"
                  color="primary"
                >
                  submit
                </Button>
              </div>
            </Fade>
          </Modal>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    marginTop: "10%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function UpdateProduct() {
  const { products, setProducts } = useContext(CartContext);

  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("price");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={products.length}
              selected={selected}
            />
            <TableBody>
              {stableSort(products, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => {
                  const isItemSelected = isSelected(product._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, product._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={product._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {product._id}
                      </TableCell>
                      <TableCell align="right">{product.price}</TableCell>
                      <TableCell align="right">{product.title}</TableCell>
                      <TableCell align="right">{product.category}</TableCell>
                      <TableCell align="right">
                        <div
                          style={{
                            width: "120px",
                            overflow: "hidden",
                            height: "60px",
                          }}
                        >
                          {product.description}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div>
                          <img
                            style={{ width: "70px", height: "60px" }}
                            src={product.image}
                            alt={product.title}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

export default UpdateProduct;
