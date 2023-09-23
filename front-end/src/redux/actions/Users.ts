import { getAllUsers, getAllVaccine } from "../../service/api";

export const getAllUsersAction =
  (name: any) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    dispatch({ type: "GET_USERS_LOADING" });
    try {
      const data: any = await getAllUsers(name);
      dispatch({ type: "GET_USERS_SUCCESS", data: data.user });
    } catch (error) {
      dispatch({ type: "GET_USERS_FAIL" });
    }
  };
