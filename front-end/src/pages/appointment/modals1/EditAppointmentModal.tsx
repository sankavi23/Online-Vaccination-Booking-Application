import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import EditAppointmentForm from "../forms1/EditShopForm";

const EditAppointmentModel = ({ data }: any) => {
  return (
    <Modal title="edit Appointment" type="edit">
      <DialogContent>
        <EditAppointmentForm data={data} />
      </DialogContent>
    </Modal>
  );
};

export default EditAppointmentModel;
