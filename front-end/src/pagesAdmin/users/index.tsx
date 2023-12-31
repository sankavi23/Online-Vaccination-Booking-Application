import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import EditUsersModel from "./modals1/EditUsersModal";
import UsersTableAD from "./usersTable";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { getAllUsersAction } from "../../redux/actions/Users";

const UserAD = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        style={{ color: "gray", marginBottom: "2%" }}
      >
        Users
      </Typography>
      <Divider />
      <Divider />
      <TextField
        onChange={(e) => dispatch(getAllUsersAction(e.target.value))}
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
   
      <UsersTableAD />
    </div>
  );
};

export default UserAD;
