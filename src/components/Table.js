import {
  Box,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import PaperComponent from "./Paper";
import React, { useState } from "react";
import ButtonComponent from "./Button";
import { STATUS } from "../config/constants";
import profilePic from "../assets/james-person-1.jpeg";
import DeleteIcon from "@mui/icons-material/Delete";
import StatusBadgeComponent from "./StatusBadge";

const statusColor = {
  [STATUS.TUTTI]: "badge1",
  [STATUS.ACTTIVI]: "badge2",
  [STATUS.INACTTIVI]: "badge3",
  [STATUS.INGRESSO]: "badge4",
  [STATUS.USCITA]: "badge5",
};

const statusTextColor = {
  [STATUS.TUTTI]: "#231F20",
  [STATUS.ACTTIVI]: "#54B435",
  [STATUS.INACTTIVI]: "#EB5353",
  [STATUS.INGRESSO]: "#068FFF",
  [STATUS.USCITA]: "#A459D1",
};

const TableComponent = (props) => {
  const [orderBy, setOrderBy] = useState(props.tableLabel[0]);
  const [order, setOrder] = useState("asc");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const sortedRows = [...(props?.rows || [])].sort((a, b) => {
    const aValue = a[orderBy.id];
    const bValue = b[orderBy.id];

    if (aValue === undefined || bValue === undefined) {
      return 0;
    }

    const numericA = parseFloat(aValue);
    const numericB = parseFloat(bValue);

    if (!isNaN(numericA) && !isNaN(numericB)) {
      return order === "asc" ? numericA - numericB : numericB - numericA;
    }

    return order === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const handleEditData = (data) => {
    props.onEditData(data);
  };

  const handleDeleteData = (data) => {
    props.onDeleteData(data);
  };

  const handleApri = (data) => {
    props.onApri(data);
  };

  return (
    <PaperComponent>
      <TableContainer>
        <Box
          my={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                fontFamily: "roboto-medium",
                textTransform: "capitalize",
              }}
            >
              {props.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                color: "#869295",
                padding: 0,
                ml: 2,
                display: "flex",
                alignItems: "center",
                fontFamily: "roboto-regular",
              }}
            >
              {props.total}
              {props.total && "€"}
            </Typography>
          </Box>
          {props.isToggle && (
            <Box>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Solo Scarti"
              />
            </Box>
          )}
        </Box>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {props?.tableLabel.map((o, i) => {
                return (
                  <TableCell key={i}>
                    <TableSortLabel
                      active={orderBy === o}
                      direction={orderBy === o ? order : "asc"}
                      onClick={() => handleSort(o)}
                      style={{
                        textTransform: "capitalize",
                        fontFamily: "roboto-medium",
                        fontWeight: 500,
                      }}
                    >
                      {o?.label?.replace("_", " €").replace(/-/g, " ")}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
              {props.isAddDelete && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row, i) => (
              <TableRow key={i}>
                {props.tableLabel.map((col, i) => (
                  <React.Fragment key={i}>
                    {col.id !== "status" && col.id !== "name" && (
                      <TableCell
                        style={{
                          textTransform: "capitalize",
                          fontFamily: "roboto-regular",
                        }}
                      >
                        {row[col.id]}
                      </TableCell>
                    )}

                    {col.id === "status" && (
                      <TableCell align="left">
                        <StatusBadgeComponent
                          backgroundColor={statusColor[row.status]}
                          textColor={statusTextColor[row.status]}
                          content={row.status}
                        />
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
                            <div>{row.name}</div>
                            <div>{row.email}</div>
                          </div>
                        </div>
                      </TableCell>
                    )}
                  </React.Fragment>
                ))}
                {props.isAddDelete && (
                  <TableCell
                    key={i}
                    align="right"
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "roboto-regular",
                      display: "flex",
                    }}
                  >
                    {props.isApri && (
                      <ButtonComponent
                        variant="contained"
                        color="secondary"
                        sx={{ color: "white" }}
                        onClick={() => handleApri(row)}
                      >
                        Apri
                      </ButtonComponent>
                    )}
                    <ButtonComponent onClick={() => handleDeleteData(row)}>
                      <DeleteIcon />
                    </ButtonComponent>
                    <ButtonComponent onClick={() => handleEditData(row)}>
                      <EditIcon />
                    </ButtonComponent>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PaperComponent>
  );
};

export default TableComponent;
