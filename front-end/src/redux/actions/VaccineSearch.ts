import { getAllSearchVaccine, getAllVaccine } from "../../service/api";

export const getAllSearchVaccineAction =
  (name: any, hosId: any) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    dispatch({ type: "GET_VACCINE_SEARCH_LOADING" });
    try {
      const data: any = await getAllSearchVaccine(name, hosId);
      let dataList: any = [];

      data.vaccine?.map((vac: any) => {
        dataList.push({
          id: vac.id,
          name: vac.vaccineName,
          type: vac.vaccineType,
          hospital: vac.hospital.firstName,
          status: vac.vaccineStatus,
        });
      });

      console.log({ dataList });

      dispatch({ type: "GET_VACCINE_SEARCH_SUCCESS", data: dataList });
    } catch (error) {
      dispatch({ type: "GET_VACCINE_SEARCH_FAIL" });
    }
  };
