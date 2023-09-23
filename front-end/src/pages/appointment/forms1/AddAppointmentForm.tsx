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
import { IAppointment } from "../../../api/clients";
import { appointmentClient } from "../../../api/appointment";
import { useGlobalContext } from "../../../context/GlobalContext";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { createAppointment, getAllHospital } from "../../../service/api";
import { UTILS } from "../../../shared/constant";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getAllAppointmentAction } from "../../../redux/actions/Appointment";

const initialValues = {
  no: "",
  time: "",
  status: "",
  date: "",
  hospital: "",
  vaccineType: "",
};

const STATUS = ["done", "pending", "cancel"];
const VACCINE_TYPE = ["COVID-19 Vaccine", "Child Vaccine", "Adult Vaccine"];

const AddAppointmentForm = () => {
  const [datevalue, setDateValue]: any = React.useState<Dayjs | null>(null);
  const [timevalue, setTimeValue]: any = React.useState<Dayjs | null>(null);
  const { setAddModalOpen, setLoading, setSnackMessage, setSnackOpen } =
    useGlobalContext();
  const [isLoading, setisLoading] = React.useState(false);

  const queryClient = useQueryClient();

  const [hospitalData, sethospitalData]: any = React.useState([]);
  const dispatch = useDispatch();

  console.log({ hospitalData });

  React.useEffect(() => {
    getAllHospital()
      .then((res: any) => {
        console.log({ res });
        sethospitalData(res.user);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  const createAppointmentFunc = (body: any) => {
    setisLoading(true);
    const payload = {
      userId: UTILS.USER_ID,
      appointmentDate: dayjs(datevalue).format("YYYY-MM-DD"),
      appointmentTime: dayjs(timevalue).format("hh:mm:ss"),
      ...body,
    };
    createAppointment(payload)
      .then((res) => {
        console.log({ res });
        setisLoading(false);
        dispatch(getAllAppointmentAction(UTILS.USER_ID, ""));
        setAddModalOpen(false);
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
        createAppointmentFunc(values);
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container rowGap={2}>
            {console.log({ values })}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Hospital</InputLabel>
                <Select
                  onChange={handleChange}
                  fullWidth
                  name="hospitalId"
                  // value={values.hospital}
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

export default AddAppointmentForm;
