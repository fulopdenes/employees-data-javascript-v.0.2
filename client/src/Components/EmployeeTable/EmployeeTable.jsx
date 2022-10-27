import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";

import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";

import React, { useState } from "react";

const EmployeeTable = ({
  sortStatus,
  setSortStatus,
  employees,
  onDelete,
  selectedColumnStatus,
  setSelectedColumnStatus,
  sortByColumn,
  setSortColumn,
  columnLabels,
  setColumnLabels,
  searchInputHandler,
  setSearchInputHandler,
}) => {
  const column = ["Name", "Level", "Position"];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setColumnLabels(typeof value === "string" ? value.split(",") : value);

    if (value.length === 0) {
      setSearchInputHandler("");
    }
    const queryLabel = value.map((x) => {
      if (x === "Name") {
        return "filter=name";
      } else if (x === "Level") {
        return "filter=level";
      } else if (x === "Position") {
        return "filter=position";
      } else {
        return "";
      }
    });
    setSelectedColumnStatus(queryLabel.join("&"));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    {selectedColumnStatus !== ""
                      ? "Selected Column(s):"
                      : "Select Column(s)"}
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={columnLabels}
                    variant="outlined"
                    onChange={handleChange}
                    input={<OutlinedInput label="Selected Column(s):" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {column.map((item) => (
                      <MenuItem key={item} value={item}>
                        <Checkbox checked={columnLabels.indexOf(item) > -1} />
                        <ListItemText primary={item} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  disabled={selectedColumnStatus !== "" ? false : true}
                  onChange={(e) => setSearchInputHandler(e.target.value)}
                  value={searchInputHandler}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                onClick={(e) =>
                  sortByColumn(
                    e.target.id,
                    setSortColumn,
                    sortStatus,
                    setSortStatus
                  )
                }
                id="name"
                align="left"
              >
                Name
              </TableCell>
              <TableCell
                id="level"
                onClick={(e) =>
                  sortByColumn(
                    e.target.id,
                    setSortColumn,
                    sortStatus,
                    setSortStatus
                  )
                }
                align="left"
              >
                Level
              </TableCell>
              <TableCell
                onClick={(e) =>
                  sortByColumn(
                    e.target.id,
                    setSortColumn,
                    sortStatus,
                    setSortStatus
                  )
                }
                id="position"
                align="left"
              >
                Position
              </TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees && employees.length
              ? employees.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell align="left">{employee.name}</TableCell>
                    <TableCell align="left">{employee.level}</TableCell>
                    <TableCell align="left">{employee.position}</TableCell>
                    <TableCell align="left">
                      <Link to={`/update/${employee._id}`}>
                        <Button variant="outlined">Update</Button>
                      </Link>
                      <Button
                        onClick={() => onDelete(employee._id)}
                        startIcon={<DeleteIcon />}
                        variant="outlined"
                        color="warning"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EmployeeTable;
