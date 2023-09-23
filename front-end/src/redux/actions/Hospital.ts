import {
  getAllSearchHospital,
  getAllUsers,
  getAllVaccine,
} from "../../service/api";

export const getAllHospitalAction =
  (name: any) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    dispatch({ type: "GET_HOSPITAL_LOADING" });
    try {
      const data: any = await getAllSearchHospital(name);
      dispatch({ type: "GET_HOSPITAL_SUCCESS", data: data.user });
    } catch (error) {
      dispatch({ type: "GET_HOSPITAL_FAIL" });
    }
  };
