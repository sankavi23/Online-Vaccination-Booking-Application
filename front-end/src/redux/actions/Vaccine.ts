import { getAllVaccine } from "../../service/api";

export const getAllVaccineAction =
  () => async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    dispatch({ type: "GET_VACCINE_LOADING" });
    try {
      const data: any = await getAllVaccine();
      dispatch({ type: "GET_VACCINE_SUCCESS", data: data.vaccine });
    } catch (error) {
      dispatch({ type: "GET_VACCINE_FAIL" });
    }
  };
