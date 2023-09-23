import CustomTable, { IColumn } from "../../components/tables/Table";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppointmentContext } from "../../context/AppointmentContext";
import { useGlobalContext } from "../../context/GlobalContext";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton, Tooltip } from "@mui/material";
import DeleteAppointmentModel from "./modals1/DeleteAppointmentModal";
import { useDispatch } from "react-redux";
import { getAllAppointmentAction } from "../../redux/actions/Appointment";
import { UTILS } from "../../shared/constant";
import { useSelector } from "react-redux";
import EditAppointmentModel from "./modals1/EditAppointmentModal";

const columns: IColumn[] = [
  { id: "id", label: "Appointment no" },
  { id: "hospitalId", label: "Hospital" },
  { id: "appointmentDate", label: "Appointment Date" },
  { id: "appointmentTime", label: "Appointment Time" },
];

const AppointmentTableCopy = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setDeleteModalOpen, setEditModalOpen } = useGlobalContext();
  const [selectedRow, setselectedRow] = useState([]);

  const dispatch = useDispatch();

  const { data } = useSelector((state: any) => state.appointmentReducer);
  console.log({ data });

  useEffect(() => {
    dispatch(getAllAppointmentAction(UTILS.USER_ID, ""));
  }, []);

  return (
    <>
      <DeleteAppointmentModel />
      <EditAppointmentModel data={selectedRow} />
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
                        console.log({ row });

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
                        // setSelectedAppointment(row);
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

export default AppointmentTableCopy;
