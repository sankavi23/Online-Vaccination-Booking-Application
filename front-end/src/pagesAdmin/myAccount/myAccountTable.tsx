import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  Alert,
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
import { useDispatch } from "react-redux";
import { getUserById, updateUser } from "../../service/api";
import { getAllUsersAction } from "../../redux/actions/Users";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Data {
  user_Id: string;
  first_name: string;
  last_name: string;
  gender: string;
  age: string;
  email: string;
  phone_no: string;
  address: string;
}
function createData(
  user_Id: string,
  first_name: string,
  last_name: string,
  gender: string,
  age: string,
  email: string,
  phone_no: string,
  address: string
): Data {
  return {
    user_Id,
    first_name,
    last_name,
    gender,
    age,
    email,
    phone_no,
    address,
  };
}

var account = new Array();

const MyAccountTableAD = () => {
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = React.useState({ add: false, edit: false });
  const [accountList, setAccountList] = React.useState(account);

  const [formData, setFormData] = React.useState({
    id: "",
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  // const handleEditAccount = () => {
  //   var temp = accountList;
  //   temp.push(
  //     createData(
  //       formData.id,
  //       formData.firstName,
  //       formData.lastName,
  //       formData.gender,
  //       formData.age,
  //       formData.email,
  //       formData.phoneNumber,
  //       formData.address
  //     )
  //   );
  //   setAccountList(temp);
  //   console.log(accountList);
  //   handleClose("edit");
  // };

  //handle the popper open and close
  const handleClickOpen = (type: String) => {
    if (type === "add") {
      setOpen({ ...open, add: true });
    } else {
      setOpen({ ...open, edit: true });
    }
  };

  const handleClose = (type: String) => {
    if (type === "add") {
      setOpen({ ...open, add: false });
    } else {
      setOpen({ ...open, edit: false });
    }
  };

  const listUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    getUserById(user.id).then((res: any) => {
      setFormData(res);
    });
  };

  useEffect(() => {
    listUser();
  }, []);

  const updateUserFunc = () => {
    const payload = {
      ...formData,
    };
    console.log({ payload });

    updateUser(payload)
      .then((res) => {
        console.log({ res });
        handleClose("edit");
        listUser();
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <div>
      {/**Edit item Dialog */}

      <Dialog open={open.edit} onClose={handleClose}>
        <DialogTitle>Edit Account </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="First Name"
            value={formData?.firstName}
            sx={{ marginTop: "10px", marginBottom: "10px" }}
            variant="outlined"
            fullWidth
            onChange={(e: any) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Last Name"
            value={formData?.lastName}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            variant="outlined"
            fullWidth
            onChange={(e: any) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <br />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">
              Gender
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select"
              name="gender"
              label="Gender"
              value={formData?.gender}
              sx={{ marginTop: "10px", marginBottom: "10px" }}
              onChange={(e: any) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Famale">Female</MenuItem>
            </Select>
          </FormControl>
          <br />
          <TextField
            id="outlined-basic"
            label="Age"
            value={formData?.age}
            sx={{ marginTop: "10px", marginBottom: "10px" }}
            variant="outlined"
            fullWidth
            onChange={(e: any) =>
              setFormData({ ...formData, age: e.target.value })
            }
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Email"
            value={formData?.email}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            variant="outlined"
            fullWidth
            onChange={(e: any) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Phone No"
            value={formData?.phoneNumber}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            variant="outlined"
            fullWidth
            onChange={(e: any) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Address"
            value={formData?.address}
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            variant="outlined"
            fullWidth
            onChange={(e: any) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ margin: "10px" }}
            onClick={updateUserFunc}
          >
            Update
          </Button>
          <Button
            onClick={() => {
              handleClose("edit");
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <div>
        <Paper
          sx={{
            width: "30%",
            overflow: "hidden",
            marginLeft: "30%",
            marginTop: "2%",
            justifySelf: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              marginLeft: "5%",
              justifyContent: "space-around",
            }}
          >
            <div>
              <br />
              <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                First Name : {formData?.firstName}
              </Typography>
              <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                Last Name : {formData?.lastName}
              </Typography>
              <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                Gender : {formData?.gender}
              </Typography>
              <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                Age : {formData?.age}
              </Typography>
              <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                Email : {formData?.email}
              </Typography>
              <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                Mobile No : {formData?.phoneNumber}
              </Typography>
              <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                Address : {formData?.address}
              </Typography>

              <br />
            </div>

            {accountList.map((data: any) => (
              <div style={{ marginLeft: "5%" }} key={data.id}>
                <br />

                <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                  {data.first_name}
                </Typography>
                <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                  {data.last_name}
                </Typography>
                <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                  {data.gender}
                </Typography>
                <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                  {data.age}
                </Typography>
                <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                  {data.email}
                </Typography>
                <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                  {data.mobile_no}
                </Typography>
                <Typography variant="h6" gutterBottom style={{ color: "gray" }}>
                  {data.address}
                </Typography>

                <br />
              </div>
            ))}
          </div>
          <Button
            variant="contained"
            onClick={() => {
              handleClickOpen("edit");
            }}
            style={{
              alignItems: "center",
              marginTop: 10,
              width: "50%",
              marginBottom: 10,
              marginLeft: "25%",
            }}
          >
            Edit Details
          </Button>
        </Paper>
      </div>
    </div>
  );
};

export default MyAccountTableAD;
