import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useUsersContext } from "../../../context/UsersContext";
import { useMutation, useQueryClient } from "react-query";
import { usersClient } from "../../../api/users";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteUser } from "../../../service/api";
import { useDispatch } from "react-redux";
import { getAllUsersAction } from "../../../redux/actions/Users";

const DeleteUsersModel = ({ data }: any) => {
  const { setDeleteModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();
  const dispatch = useDispatch();

  const deleteUserFunc = (id: any) => {
    deleteUser(id)
      .then((res) => {
        console.log({ res });
        setDeleteModalOpen(false);
        dispatch(getAllUsersAction(""));
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <Modal title="delete users" type="delete">
      <DialogContent>
        <DialogContentText>
          Do you want to delete this User from your list?
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

export default DeleteUsersModel;
