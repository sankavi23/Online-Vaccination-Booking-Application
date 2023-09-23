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
import { useAppointmentContext } from "../../../context/AppointmentContext";
import { IAppointment, apiClient } from "../../../api/clients";
import { useGlobalContext } from "../../../context/GlobalContext";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { getAllHospital, updateAppointment } from "../../../service/api";
import { useDispatch } from "react-redux";
import { getAllAppointmentAction } from "../../../redux/actions/Appointment";
import { UTILS } from "../../../shared/constant";

const STATUS = ["done", "pending", "cancel"];
const VACCINE_TYPE = ["COVID-19 Vaccine", "Child Vaccine", "Adult Vaccine"];

const EditAppointmentForm = ({ data }: any) => {
  const [datevalue, setDateValue]: any = React.useState<Dayjs | null>(null);
  const [timevalue, setTimeValue]: any = React.useState<Dayjs | null>(null);
  const { setEditModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();


  console.log({ data });

  const [hospitalData, sethospitalData]: any = React.useState([]);

  React.useEffect(() => {
    setDateValue(moment(data?.appointmentDate));
    setTimeValue(moment(data?.appointmentTime, "hh:mm:ss"));
    getAllHospital()
      .then((res: any) => {
        console.log({ res });
        sethospitalData(res.user);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  const dispatch = useDispatch();

  const updateUserFunc = (values: any) => {
    const payload = {
      id: values?.id,
      status: values?.status,
      appointmentDate: dayjs(datevalue).format("YYYY-MM-DD"),
      appointmentTime: dayjs(timevalue).format("hh:mm:ss"),
      hospitalId: values?.hospital,
      vaccineType: values?.vaccineType,
      userId: data?.userId,
    };

    updateAppointment(payload)
      .then((res) => {
        console.log({ res });
        setEditModalOpen(false);
        dispatch(getAllAppointmentAction(UTILS.USER_ID, ""));
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <Formik
      initialValues={{
        id: data?.id,
        status: data?.status,
        appointmentDate: data?.appointmentDate,
        appointmentTime: data?.appointmentTime,
        hospitalId: data?.hospitalId,
        vaccineType: data?.vaccineType,
        hospital: data?.hospital,
        userId: data?.userId,
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
                <InputLabel>Hospital</InputLabel>
                <Select
                  onChange={handleChange}
                  fullWidth
                  name="hospitalId"
                  value={values.hospital}
                >
                  {hospitalData?.map((item: any, index: any) => (
                    <MenuItem key={index} value={item.id}>
                      {item.firstName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Vaccine Type</InputLabel>
                <Select
                  onChange={handleChange}
                  fullWidth
                  name="type"
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
                  name="status"
                  value={values.status}
                >
                  {STATUS.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    value={datevalue}
                    onChange={(newValue: any) => {
                      setDateValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Time"
                    value={timevalue}
                    onChange={(newValue) => {
                      setTimeValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
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

export default EditAppointmentForm;
