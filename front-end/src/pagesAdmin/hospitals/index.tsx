import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import AddButton from "../../components/buttons/AddButton";
import AddHospitalModal from "./modals1/AddHospitalModal";
import EditHospitalModel from "./modals1/EditHospitalModal";
import HospitalTableAD from "./hospitalTable";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { getAllHospitalAction } from "../../redux/actions/Hospital";

const HospitalsAD = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: "gray" }}>
        Hospitals
      </Typography>
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          onChange={(e) => dispatch(getAllHospitalAction(e.target.value))}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          sx={{
            margin: "10px 0px 10px 30px",
            backgroundColor: "white",
            "& label.Mui-focused": { color: "#F27405" },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "#F27405" },
            },
          }}
        />
        <AddButton title="add new Hospital" />
      </div>
      <div style={{ height: 5 }}></div>

      <AddHospitalModal />
      <HospitalTableAD />
    </div>
  );
};

export default HospitalsAD;
