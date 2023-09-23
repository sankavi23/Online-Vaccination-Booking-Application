import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import EditUsersForm from "../forms1/EditUsersForm";

const EditUsersModel = ({ data }: any) => {
  return (
    <Modal title="edit User" type="edit">
      <DialogContent>
        <EditUsersForm data={data} />
      </DialogContent>
    </Modal>
  );
};

export default EditUsersModel;
