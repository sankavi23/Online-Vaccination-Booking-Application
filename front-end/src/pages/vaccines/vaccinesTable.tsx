import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { getAllSearchVaccine } from "../../service/api";
import { getAllSearchVaccineAction } from "../../redux/actions/VaccineSearch";
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

{
  /** 
function createData(
  _id:string,
  name: string,
  type:string,
  hospital: string,

) {
  return { _id,name,type,hospital};
}

const rows = [
  createData('001V','sinoform',"Covid-19",'Akp hospital,batti hospital'),
  createData('002V','fizer',"Covid-19",'Akp hospital,batti hospital,kalmunai hospital'),
  createData('003V','poliyo',"Covid-19",'Akp hospital,batti hospital'),

];*/
}

const VaccinesTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const dispatch = useDispatch();
  const { data }: any = useSelector((state: any) => state.vaccineSearchReducer);

  //fetch API Hear************************************************
  useEffect(() => {
    dispatch(getAllSearchVaccineAction("", ""));
  }, []);
  console.log(data);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "800px",
        overflow: "hidden",
        marginTop: "2%",
        marginLeft: "10%",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        size="small"
        sx={{
          margin: "10px 0px 10px 30px",
          backgroundColor: "white",
          "& label.Mui-focused": { color: "#F27405" },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "#F27405" },
          },
        }}
        onChange={(e) => {
          dispatch(getAllSearchVaccineAction(e.target.value, ""));
        }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ backgroundColor: "#2c73d2" }}>
                Vaccine Name
              </StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#2c73d2" }}>
                Vaccine Type
              </StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#2c73d2" }}>
                Available Hospitals
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.type}</StyledTableCell>
                <StyledTableCell>{row.hospital}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default VaccinesTable;
