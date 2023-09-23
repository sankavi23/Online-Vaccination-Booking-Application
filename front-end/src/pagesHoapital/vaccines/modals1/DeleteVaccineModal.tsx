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
import { deleteVaccine } from "../../../service/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllVaccineAction } from "../../../redux/actions/Vaccine";

const DeleteVaccineModel = ({ data }: any) => {
  const { setDeleteModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  const deleteVaccineFunc = () => {
    setisLoading(true);
    deleteVaccine(data.id)
      .then((res) => {
        console.log({ res });
        setisLoading(false);
        setDeleteModalOpen(false);
        dispatch(getAllVaccineAction());
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
            onClick={deleteVaccineFunc}
            variant="contained"
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
