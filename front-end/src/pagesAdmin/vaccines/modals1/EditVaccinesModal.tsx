import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import EditVaccineForm from "../forms1/EditVaccinesForm";

const EditVaccineModel = ({ data }: any) => {
  return (
    <Modal title="edit Vaccines" type="edit">
      <DialogContent>
        <EditVaccineForm data={data} />
      </DialogContent>
    </Modal>
  );
};

export default EditVaccineModel;
