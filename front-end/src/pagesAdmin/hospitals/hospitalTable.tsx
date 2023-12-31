import CustomTable, { IColumn } from "../../components/tables/Table";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHospitalContext } from "../../context/HospitalContext";
import { useGlobalContext } from "../../context/GlobalContext";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteHospitalModel from "./modals1/DeleteHospitalModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllHospitalAction } from "../../redux/actions/Hospital";
import EditHospitalModel from "./modals1/EditHospitalModal";

const columns: IColumn[] = [
  { id: "id", label: "Hospital Id" },
  { id: "firstName", label: "Name" },
  { id: "email", label: "Email" },
  { id: "phoneNumber", label: "Phone No" },
  { id: "address", label: "address" },
];

const HospitalTableAD = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setDeleteModalOpen, setEditModalOpen } = useGlobalContext();
  const [selectedRow, setselectedRow] = useState();

  const { data } = useSelector((state: any) => state.hospitalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHospitalAction(""));
  }, []);

  return (
    <>
      <DeleteHospitalModel data={selectedRow} />
      <EditHospitalModel data={selectedRow} />
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

export default HospitalTableAD;
