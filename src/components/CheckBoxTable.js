import PaperComponent from "./Paper";
import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import { STATUS, roles } from "../config/constants";
import profilePic from "../assets/james-person-1.jpeg";
import {
  Box,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import StatusBadgeComponent from "./StatusBadge";

let headCells;
let rows;

export const roleMappings = {
  SuperAdministrator: { value: roles.SUPER_ADMIN },
  Administrator: { value: roles.ADMIN },
  Accountant: { value: roles.ACCOUNTANT },
  User: { value: roles.USER },
};

const CheckBoxTable = (props) => {
  headCells = props.headCells;
  rows = props.rows;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("role");
  const [selected, setSelected] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClickTable = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    props.selectedRecord(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)),
    [rows, order, orderBy],
  );
  const { sendEditModalData } = props;
  const handleEditDetails = (id, status, row) => {
    sendEditModalData(id, status, row);
  };

  const statusMappings = {
    0: { text: STATUS.INACTTIVI, color: "#EB5353", badge: "badge3.main" },
    1: { text: STATUS.ACTTIVI, color: "#54B435", badge: "badge2.main" },
    2: { text: STATUS.TUTTI, color: "#231F20", badge: "badge1.main" },
    3: { text: STATUS.INGRESSO, color: "#068FFF", badge: "badge4.main" },
    4: { text: STATUS.USCITA, color: "#A459D1", badge: "badge5.main" },
  };

  return (
    <div>
      <PaperComponent>
        {rows.length > 0 ? (
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
              />
              <TableBody>
                {visibleRows?.map((row, i) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${i}`;
                  return (
                    <TableRow
                      key={i}
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClickTable(event, row.id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      {props.headCells.map((col, i) => (
                        <React.Fragment key={i}>
                          {col.id === "descrizione" && (
                            <TableCell align="left">
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyItems: "center",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <img
                                  src={profilePic}
                                  alt="produtc"
                                  style={{ width: "100px", height: "67px" }}
                                />
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    leading: "20px",
                                    fontWeight: 400,
                                    fontFamily: "roboto-regular",
                                  }}
                                >
                                  Description
                                </Typography>
                              </Box>
                            </TableCell>
                          )}
                          {col.id === "status" && (
                            <TableCell align="left">
                              <StatusBadgeComponent
                                backgroundColor={
                                  statusMappings[row.isActive].badge
                                }
                                textColor={statusMappings[row.isActive].color}
                                content={statusMappings[row.isActive].text}
                              />
                            </TableCell>
                          )}
                          {col.id === "role" && (
                            <TableCell align="left">
                              <div>{roleMappings[row.role].value}</div>
                            </TableCell>
                          )}

                          {col.id === "name" && (
                            <TableCell>
                              <div style={{ display: "flex", gap: "8px" }}>
                                {props.isProfile && (
                                  <img
                                    src={profilePic}
                                    alt="profile"
                                    style={{
                                      borderRadius: "100%",
                                      height: "40px",
                                      width: "40px",
                                    }}
                                  />
                                )}
                                <div>
                                  <div>{row[col.id]}</div>
                                  <div>{row.email}</div>
                                </div>
                              </div>
                            </TableCell>
                          )}
                          {col.id !== "name" &&
                            col.id !== "status" &&
                            col.id !== "descrizione" &&
                            col.id !== "role" && (
                              <TableCell
                                align="left"
                                key={i}
                                style={{
                                  textTransform: "capitalize",
                                  fontFamily: "roboto-regular",
                                }}
                              >
                                {row[col.id]}
                              </TableCell>
                            )}
                        </React.Fragment>
                      ))}

                      <TableCell align="right">
                        <Box sx={{ display: "flex", justifyContent: "end" }}>
                          <Box
                            mr={2}
                            onClick={() => handleEditDetails(row.id, true, row)}
                          >
                            <EditIcon sx={{ color: "#707070" }} />
                            {props.isDelete && (
                              <DeleteIcon sx={{ color: "#707070", ml: 2 }} />
                            )}
                          </Box>
                          <Box>
                            {!props.isDelete && (
                              <MoreVertIcon sx={{ color: "#707070" }} />
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            sx={{
              fontSize: "20px",
              fontFamily: "roboto-bold",
              textAlign: "center",
              my: "20px",
            }}
          >
            {"Dati non trovati!"}
          </Typography>
        )}
      </PaperComponent>
    </div>
  );
};
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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells?.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <span style={{ fontFamily: "roboto-medium" }}>
                {headCell.label}
              </span>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default CheckBoxTable;
