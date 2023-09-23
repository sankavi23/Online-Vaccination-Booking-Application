import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import EditHospitalForm from "../forms1/EditHospitalForm";

const EditHospitalModel = ({ data }: any) => {
  return (
    <Modal title="edit Hospital" type="edit">
      <DialogContent>
        <EditHospitalForm data={data} />
      </DialogContent>
    </Modal>
  );
};

export default EditHospitalModel;
