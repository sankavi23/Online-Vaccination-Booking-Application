import CustomTable, { IColumn } from "../../components/tables/Table";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppointmentContext } from "../../context/AppointmentContext";
import { useGlobalContext } from "../../context/GlobalContext";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteAppointmentModel from "./modals1/DeleteAppointmentModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllAppointmentAction } from "../../redux/actions/Appointment";
import { UTILS } from "../../shared/constant";
import EditAppointmentModel from "./modals1/EditAppointmentModal";

const columns: IColumn[] = [
  { id: "id", label: "Appointment Id" },
  { id: "userId", label: "User Id" },
  { id: "appointmentDate", label: "Date" },
  { id: "appointmentTime", label: "Time" },
];

const AppointmentTableHP = () => {
  const { data } = useSelector((state: any) => state.appointmentReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setDeleteModalOpen, setEditModalOpen } = useGlobalContext();
  const [selectedRow, setselectedRow] = useState([]);
  const [tableData, settableData] = useState([]);

  console.log({ data });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointmentAction(UTILS.HOS_ID, ""));
    let dataList: any = [];
    data &&
      data?.map((app: any) => {
        dataList.push({
          id: app?.id,
          userId: app?.userId,
          appointmentDate: app?.appointmentDate,
          appointmentTime: app?.appointmentTime,
          hospitalId: app?.hospitalId,
          vaccineType: app?.vaccineType,
          hospital: app?.hospital,
          status: app?.status,
        });
      });
    settableData(dataList);
    console.log({ dataList });
  }, []);

  return (
    <>
      <DeleteAppointmentModel />
      <EditAppointmentModel data={selectedRow} />
      <CustomTable
        columns={columns}
        count={tableData?.length!}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      >
        {tableData
          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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

export default AppointmentTableHP;
