import CustomTable, { IColumn } from "../../components/tables/Table";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useVaccineContext,
  useVaccineReducer,
} from "../../context/VaccinesContext";
import { useGlobalContext } from "../../context/GlobalContext";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteVaccineModel from "./modals1/DeleteVaccineModal";
import { useQuery } from "react-query";
import { vaccineClient } from "../../api/vaccine";
import EditVaccineModal from "./modals1/EditVaccineModal";
import { useSelector, useDispatch } from "react-redux";
import { getAllSearchVaccineAction } from "../../redux/actions/VaccineSearch";
import { UTILS } from "../../shared/constant";
import { getAllHospitalSearchVaccineAction } from "../../redux/actions/HospitalVaccine";

const columns: IColumn[] = [
  { id: "id", label: "Vaccine Id" },
  { id: "vaccineName", label: "Vaccine Name" },
  { id: "vaccineStatus", label: "status" },
];

const VaccineTableHP = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setDeleteModalOpen, setEditModalOpen } = useGlobalContext();
  const { setSelectedVaccine, selectedVaccine } = useVaccineContext();
  const [selectedRow, setselectedRow]: any = useState();

  const dispatch = useDispatch();

  const { data } = useSelector((state: any) => state.hospitalVaccineReducer);

  console.log({ data });

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllHospitalSearchVaccineAction("", UTILS.HOS_ID));
    }, 500);
  }, []);

  return (
    <>
      <DeleteVaccineModel data={selectedRow} />
      <EditVaccineModal
        setselectedRow={selectedRow} // pass selected vaccine data to the modal
      />
      <CustomTable
        columns={columns}
        count={data?.length!}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      >
        {data
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

export default VaccineTableHP;
