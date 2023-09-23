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
import { useVaccineContext } from "../../../context/VaccinesContext";
import { IVaccine, apiClient } from "../../../api/clients";
import { useGlobalContext } from "../../../context/GlobalContext";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { updateVaccine } from "../../../service/api";
import { useDispatch } from "react-redux";
import { UTILS } from "../../../shared/constant";
import { getAllSearchVaccineAction } from "../../../redux/actions/VaccineSearch";

const STATUS = ["Available", "Not Available"];
const VACCINE_TYPE = ["pfizer", "sinopharm", "moderna"];

const EditVaccineForm = ({ data }: any) => {
  const [datevalue, setDateValue] = React.useState<Dayjs | null>(null);
  const [timevalue, setTimeValue] = React.useState<Dayjs | null>(null);
  const { setEditModalOpen } = useGlobalContext();

  const dispatch = useDispatch();

  const update = (body: any) => {
    const payload = {
      hospitalId: UTILS.HOS_ID,
      ...body,
    };
    updateVaccine(payload)
      .then((res) => {
        console.log({ res });
        dispatch(getAllSearchVaccineAction("", ""));
        setEditModalOpen(false);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <Formik
      initialValues={{
        id: data?.id,
        vaccineName: data?.name,
        vaccineStatus: data?.status,
        vaccineType: data?.type,
      }}
      onSubmit={(values, { resetForm }) => {
        update(values);
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

export default EditVaccineForm;
