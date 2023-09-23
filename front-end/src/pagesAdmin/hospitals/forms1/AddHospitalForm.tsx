import {
  Button,
  Grid,
  TextField,
  DialogActions,
  FormControl,
  CircularProgress,
} from "@mui/material";
import * as React from "react";
import { Formik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { IHospital } from "../../../api/clients";
import { hospitalClient } from "../../../api/hospital";
import { useGlobalContext } from "../../../context/GlobalContext";
import { Dayjs } from "dayjs";
import { register } from "../../../service/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getAllHospitalAction } from "../../../redux/actions/Hospital";

const initialValues = {
  firstName: "",
  address: "",
  email: "",
  roleName: "HOSPITAL",
  phoneNumber: "",
  password: "",
};

const AddHospitalForm = () => {
  const { setAddModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();

  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    console.log({ e });

    const payload = {
      firstName: e.firstName,
      phoneNumber: e.phoneNumber,
      address: e.address,
      email: e.email,
      roleName: "HOSPITAL",
      password: e.password,
    };

    register(payload)
      .then((res) => {
        console.log({ res });
        dispatch(getAllHospitalAction(""));
        setAddModalOpen(false);
      })
      .catch((err) => {
        console.log(err.data?.validationFailures[0].message);
        toast.error(err.data?.validationFailures[0].message);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        console.log({ values });
        handleSubmit(values);
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container rowGap={2} columnGap={2}>
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
                  label="Password"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <DialogActions>
            <Button variant="contained" type="submit">
              add
            </Button>
            <Button
              onClick={() => setAddModalOpen(false)}
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

export default AddHospitalForm;
