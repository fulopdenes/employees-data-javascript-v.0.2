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
import { useTheme } from "@mui/material/styles";

const EmployeeTable = ({
  sortStatus,
  setSortStatus,
  employees, //! ezzel dolgozunk
  onDelete,
  setSelectedColumnStatus,
  sortByColumn,
  personName,
  setPersonName,
}) => {
  const optionListValues = (column) => {
    column.shift();
    column.pop();
    column.pop();
    return column;
  };

  const [age, setAge] = useState("");
  const [column, setColumn] = useState(
    optionListValues(Object.keys(employees[0]))
  ); //! we assume that all "documents" have the same "keys", so we take the structure of the document with index 0 as the starting point!

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

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {column.map((item) => (
                      <MenuItem key={item} value={item}>
                        <Checkbox checked={personName.indexOf(item) > -1} />
                        <ListItemText primary={item} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  // margin="dense"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                onClick={(e) =>
                  sortByColumn(
                    e.target.id,
                    setSelectedColumnStatus,
                    sortStatus,
                    setSortStatus
                  )
                }
                id="name"
                align="left"
              >
                Name
              </TableCell>
              {/* <TableCell align="left">Middle Name</TableCell>
          <TableCell align="left">Last Name</TableCell> */}
              <TableCell
                id="level"
                onClick={(e) =>
                  sortByColumn(
                    e.target.id,
                    setSelectedColumnStatus,
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
                    setSelectedColumnStatus,
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
