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

const EmployeeTable = ({ employees, onDelete }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">Name</TableCell>
          {/* <TableCell align="left">Middle Name</TableCell>
          <TableCell align="left">Last Name</TableCell> */}
          <TableCell align="left">Level</TableCell>
          <TableCell align="left">Position</TableCell>
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
);

export default EmployeeTable;
