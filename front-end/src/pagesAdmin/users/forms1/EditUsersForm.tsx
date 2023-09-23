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
import { useUsersContext } from "../../../context/UsersContext";
import { IUsers, apiClient } from "../../../api/clients";
import { useGlobalContext } from "../../../context/GlobalContext";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { deleteUser, updateUser } from "../../../service/api";
import { useDispatch } from "react-redux";
import { getAllUsersAction } from "../../../redux/actions/Users";

const GENDER = ["male", "female"];

const EditUsersForm = ({ data }: any) => {
  const [datevalue, setDateValue] = React.useState<Dayjs | null>(null);
  const [timevalue, setTimeValue] = React.useState<Dayjs | null>(null);
  const { setEditModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();
  const queryClient = useQueryClient();
  const [isLoading, setisLoading] = React.useState(false);

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
        dispatch(getAllUsersAction(""));
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
        lastName: data?.lastName,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        gender: data?.gender,
        age: data?.age,
        roleName: data?.roleName,
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
                  label="First Name"
                  fullWidth
                  value={values.firstName}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  value={values.lastName}
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
                  name="phoneNumber"
                  label="Mobile No"
                  fullWidth
                  value={values.phoneNumber}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  onChange={handleChange}
                  fullWidth
                  name="gender"
                  value={values.gender}
                >
                  {GENDER.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  name="age"
                  label="Age"
                  fullWidth
                  value={values.age}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <DialogActions>
            <Button variant="contained" type="submit">
              {isLoading ? <CircularProgress /> : "update"}
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

export default EditUsersForm;
