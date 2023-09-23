import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../../service/api";
import { UTILS } from "../../shared/constant";

const Setting = () => {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [username, setusername] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const changePasswordFunc = () => {
    const payload = {
      id: UTILS.USER_ID,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    changePassword(payload)
      .then((res) => {
        console.log({ res });
        setoldPassword("");
        setnewPassword("");
        setconfirmPassword("");
        setusername("");
        toast.success("Password Updated");
      })
      .catch((err) => {
        console.log({ err });
        toast.error(err.data?.validationFailures[0]?.message);
      });
  };

  return (
    <div style={{ width: "40%" }}>
      <TextField
        id="outlined-basic"
        label="User Name"
        sx={{
          marginTop: "10px",
          marginBottom: "10px",
          justifyContent: "center",
        }}
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <br />

      <TextField
        id="outlined-basic"
        label="Old password"
        sx={{ marginTop: "10px", marginBottom: "10px" }}
        variant="outlined"
        fullWidth
        value={oldPassword}
        type="password"
        onChange={(e) => setoldPassword(e.target.value)}
      />
      <br />

      <TextField
        id="outlined-basic"
        label="New Password"
        type="password"
        sx={{ marginTop: "10px", marginBottom: "10px" }}
        variant="outlined"
        fullWidth
        value={newPassword}
        onChange={(e) => setnewPassword(e.target.value)}
      />
      <br />

      <TextField
        id="outlined-basic"
        label="Confirm password"
        type="password"
        sx={{ marginTop: "10px", marginBottom: "10px" }}
        variant="outlined"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setconfirmPassword(e.target.value)}
      />
      <br />

      <Button
        variant="contained"
        sx={{ margin: "10px" }}
        onClick={changePasswordFunc}
        style={{ alignItems: "center", marginLeft: "40%" }}
      >
        Update
      </Button>
    </div>
  );
};

export default Setting;
