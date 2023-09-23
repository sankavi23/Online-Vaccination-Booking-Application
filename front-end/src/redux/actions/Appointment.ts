import { getAllAppointment } from "../../service/api";

export const getAllAppointmentAction =
  (id: any, hosname: any) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    dispatch({ type: "GET_APPOINTMENT_LOADING" });
    try {
      const data: any = await getAllAppointment(id, hosname);
      let dataList: any = [];

      data?.appointment?.map((item: any) => {
        dataList.push({
          hospitalId: item.hospital.firstName,
          appointmentDate: item.appointmentDate,
          appointmentTime: item.appointmentTime,
          id: item.id,
          vaccineType: item.vaccineType,
          userId: item?.user?.id,
          hospital: item.hospital.id,
          status: item?.status,
        });
      });
      console.log({ dataList });

      dispatch({ type: "GET_APPOINTMENT_SUCCESS", data: dataList });
    } catch (error) {
      dispatch({ type: "GET_APPOINTMENT_FAIL" });
    }
  };
