import CustomTable, { IColumn } from "../../components/tables/Table";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useVaccineContext } from "../../context/VaccinesContext";
import { useGlobalContext } from "../../context/GlobalContext";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteVaccineModel from "./modals1/DeleteVaccinesModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllSearchVaccineAction } from "../../redux/actions/VaccineSearch";
import EditVaccinesModel from "./modals1/EditVaccinesModal";

const columns: IColumn[] = [
  { id: "id", label: "Vaccine Id" },
  { id: "name", label: "Vaccine Name" },
  { id: "status", label: "status" },
];

const VaccineTableAD = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setDeleteModalOpen, setEditModalOpen } = useGlobalContext();

  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.vaccineSearchReducer);
  const [selectedRow, setselectedRow] = useState();

  useEffect(() => {
    dispatch(getAllSearchVaccineAction("", ""));
  }, []);

  return (
    <>
      <DeleteVaccineModel data={selectedRow} />
      <EditVaccinesModel data={selectedRow} />
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

export default VaccineTableAD;
