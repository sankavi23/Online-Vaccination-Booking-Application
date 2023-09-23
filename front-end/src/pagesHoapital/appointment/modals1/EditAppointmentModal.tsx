import Modal from "../../../components/modals/MainModal";
import DialogContent from "@mui/material/DialogContent";
import EditAppointmentHPForm from "../forms1/EditAppointmentHPForm";

const EditAppointmentModel = ({ data }: any) => {
  return (
    <Modal title="edit Appointment" type="edit">
      <DialogContent>
        <EditAppointmentHPForm data={data} />
      </DialogContent>
    </Modal>
  );
};

export default EditAppointmentModel;
