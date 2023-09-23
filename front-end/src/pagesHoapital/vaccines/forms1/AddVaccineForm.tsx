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
import MenuItem from "@mui/material/MenuItem";
import { Formik } from "formik";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { IVaccine } from "../../../api/clients";
import { vaccineClient } from "../../../api/vaccine";
import { useGlobalContext } from "../../../context/GlobalContext";
import { createVaccine } from "../../../service/api";
import { UTILS } from "../../../shared/constant";
import { useDispatch } from "react-redux";
import { getAllSearchVaccineAction } from "../../../redux/actions/VaccineSearch";
import { getAllHospitalSearchVaccineAction } from "../../../redux/actions/HospitalVaccine";

const initialValues = {
  vaccineName: "",
  vaccineType: "",
  vaccineStatus: "",
};

const STATUS = ["AVAILABLE", "UNAVAILABLE"];
const VACCINE_TYPE = ["COVID-19 Vaccine", "Child Vaccine", "Adult Vaccine"];

const AddVaccineForm = () => {
  const { setAddModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();

  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false);

  const createVaccineFunc = (body: any) => {
    setisLoading(true);
    const payload = {
      hospitalId: UTILS.HOS_ID,
      ...body,
    };
    createVaccine(payload)
      .then((res) => {
        console.log({ res });
        setisLoading(false);
        setAddModalOpen(false);
        dispatch(getAllHospitalSearchVaccineAction("", UTILS.HOS_ID));
      })
      .catch((err) => {
        setisLoading(false);
        console.log({ err });
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        createVaccineFunc(values);
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container rowGap={2} columnGap={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  name="vaccineName"
                  label="Vaccine Name"
                  fullWidth
                  value={values.vaccineName}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Vaccine Type</InputLabel>
                <Select
                  onChange={handleChange}
                  fullWidth
                  name="vaccineType"
                  value={values.vaccineType}
                >
                  {VACCINE_TYPE.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>status</InputLabel>
                <Select
                  onChange={handleChange}
                  fullWidth
                  name="vaccineStatus"
                  value={values.vaccineStatus}
                >
                  {STATUS.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <DialogActions>
            <Button variant="contained" type="submit">
              {isLoading ? <CircularProgress /> : "add"}
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

export default AddVaccineForm;
