import CustomTable, { IColumn } from "../../components/tables/Table";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUsersContext } from "../../context/UsersContext";
import { useGlobalContext } from "../../context/GlobalContext";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton, Tooltip } from "@mui/material";
import DeleteUsersModel from "./modals1/DeleteUsersModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllUsersAction } from "../../redux/actions/Users";
import EditUsersModel from "./modals1/EditUsersModal";

const columns: IColumn[] = [
  { id: "id", label: "User Id" },
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "email", label: "Email" },
  { id: "phoneNumber", label: "Mobile No" },
  { id: "gender", label: "Gender" },
  { id: "age", label: "Age" },
];

const UsersTableAD = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setDeleteModalOpen, setEditModalOpen } = useGlobalContext();
  const [selectedRow, setselectedRow] = useState();
  // const { setSelectedUsers, users } = useUsersContext();

  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.usersReducer);

  useEffect(() => {
    dispatch(getAllUsersAction(""));
  }, []);

  console.log({ data });

  return (
    <>
      <DeleteUsersModel data={selectedRow} />
      <EditUsersModel data={selectedRow} />
      <CustomTable
        columns={columns}
        count={data.length!}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      >
        {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row: any, setkey: any) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={setkey}>
                {columns.map((col, index) => {
                  return (
                    <TableCell key={index} align={col.align}>
                      {row[col.id as keyof Omit<typeof row, "_id">]}
                    </TableCell>
                  );
                })}
                <TableCell
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip title="edit">
                    <IconButton
                      onClick={() => {
                        setselectedRow(row);
                        setEditModalOpen(true);
                      }}
                    >
                      <BorderColorIcon
                        color="success"
                        sx={{
                          cursor: "pointer",
                        }}
                        fontSize="medium"
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>

                <TableCell
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip title="delete">
                    <IconButton
                      onClick={() => {
                        setselectedRow(row);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <DeleteIcon
                        color="error"
                        sx={{ cursor: "pointer" }}
                        fontSize="medium"
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
      </CustomTable>
    </>
  );
};

export default UsersTableAD;
