import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import EditVaccineForm from "../forms1/EditVaccineForm";

const EditVaccineModel = ({ setselectedRow }: any) => {
  console.log({ setselectedRow });

  return (
    <Modal title="edit Vaccines" type="edit">
      <DialogContent>
        <EditVaccineForm data={setselectedRow} />
      </DialogContent>
    </Modal>
  );
};

export default EditVaccineModel;
