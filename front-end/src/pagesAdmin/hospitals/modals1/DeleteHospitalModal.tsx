import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useHospitalContext } from "../../../context/HospitalContext";
import { useMutation, useQueryClient } from "react-query";
import { hospitalClient } from "../../../api/hospital";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteUser } from "../../../service/api";
import { useDispatch } from "react-redux";
import { getAllUsersAction } from "../../../redux/actions/Users";
import { getAllHospitalAction } from "../../../redux/actions/Hospital";

const DeleteHospitalModel = ({ data }: any) => {
  const { setDeleteModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();
  const dispatch = useDispatch();

  const deleteUserFunc = (id: any) => {
    deleteUser(id)
      .then((res) => {
        console.log({ res });
        setDeleteModalOpen(false);
        dispatch(getAllHospitalAction(""));
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <Modal title="delete hospital" type="delete">
      <DialogContent>
        <DialogContentText>
          Do you want to delete this Hospital from your list?
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => setDeleteModalOpen(false)}
            variant="outlined"
            color="warning"
          >
            cancel
          </Button>
          <Button variant="contained" onClick={() => deleteUserFunc(data.id)}>
            delete
          </Button>
        </DialogActions>
      </DialogContent>
    </Modal>
  );
};

export default DeleteHospitalModel;
