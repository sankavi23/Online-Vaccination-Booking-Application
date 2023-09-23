import {
  Button,
  Grid,
  TextField,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { Formik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { useHospitalContext } from "../../../context/HospitalContext";
import { IHospital, apiClient } from "../../../api/clients";
import { useGlobalContext } from "../../../context/GlobalContext";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../service/api";
import { getAllUsersAction } from "../../../redux/actions/Users";
import { getAllHospitalAction } from "../../../redux/actions/Hospital";
import { UTILS } from "../../../shared/constant";
import { getAllAppointmentAction } from "../../../redux/actions/Appointment";

const EditHospitalForm = ({ data }: any) => {
  const [datevalue, setDateValue] = React.useState<Dayjs | null>(null);
  const [timevalue, setTimeValue] = React.useState<Dayjs | null>(null);
  const { setEditModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();

  const dispatch = useDispatch();

  const updateUserFunc = (values: any) => {
    const payload = {
      roleName: data?.roleName,
      ...values,
    };
    console.log({ payload });

    updateUser(payload)
      .then((res) => {
        console.log({ res });
        setEditModalOpen(false);
        dispatch(getAllHospitalAction(""));
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <Formik
      initialValues={{
        id: data?.id,
        firstName: data?.firstName,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        address: data?.address,
        password: data?.password,
      }}
      onSubmit={(values, { resetForm }) => {
        updateUserFunc(values);
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container rowGap={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  name="firstName"
                  label="Hospital Name"
                  fullWidth
                  value={values.firstName}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  name="phoneNumber"
                  label="Phone No"
                  fullWidth
                  value={values.phoneNumber}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  name="email"
                  label="Email"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  name="address"
                  label="Address"
                  fullWidth
                  value={values.address}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  name="password"
                  label="Email"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <DialogActions>
            <Button variant="contained" type="submit">
              update
            </Button>
            <Button
              onClick={() => setEditModalOpen(false)}
              variant="outlined"
              color="error"
            >
              cancel
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};

export default EditHospitalForm;
