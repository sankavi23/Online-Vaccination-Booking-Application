import { combineReducers } from "redux";

import vaccineReducer from "./Vaccine";
import appointmentReducer from "./Appointment";
import vaccineSearchReducer from "./VaccineSearch";
import usersReducer from "./Users";
import hospitalReducer from "./Hospital";
import hospitalVaccineReducer from "./HospitalVaccine";

const reducers = combineReducers({
  vaccineReducer,
  appointmentReducer,
  vaccineSearchReducer,
  usersReducer,
  hospitalReducer,
  hospitalVaccineReducer,
});

export { reducers };
