import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useVaccineContext } from "../../../context/VaccinesContext";
import { useMutation, useQueryClient } from "react-query";
import { vaccineClient } from "../../../api/vaccine";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteVaccine } from "../../../service/api";
import { getAllSearchVaccineAction } from "../../../redux/actions/VaccineSearch";

const DeleteVaccineModel = ({ data }: any) => {
  const { setDeleteModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();

  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);

  const deleteVaccineFunc = () => {
    setisLoading(true);
    deleteVaccine(data.id)
      .then((res) => {
        console.log({ res });
        setisLoading(false);
        setDeleteModalOpen(false);
        dispatch(getAllSearchVaccineAction("", ""));
      })
      .catch((err) => {
        setisLoading(false);
        console.log({ err });
      });
  };

  return (
    <Modal title="delete vaccine" type="delete">
      <DialogContent>
        <DialogContentText>
          Do you want to delete this Vaccine from your list?
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => setDeleteModalOpen(false)}
            variant="outlined"
            color="warning"
          >
            cancel
          </Button>
          <Button
            variant="contained"
            onClick={deleteVaccineFunc}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress /> : "delete"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Modal>
  );
};

export default DeleteVaccineModel;
