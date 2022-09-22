import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import axios from "axios";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stack,
  Alert,
} from "@mui/material";
import {
  Paper,
  Button,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function UpdateLmsAdminForm(props) {
  const theme = createTheme({
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            height: 15,
            borderRadius: 5,
          },
          colorPrimary: {
            backgroundColor: "#EEEEEE",
          },
          bar: {
            borderRadius: 5,
            backgroundColor: "#1a90ff",
          },
        },
      },
    },
  });

  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const auth = useAuth()
  console.log("User: ", auth.user)
//   const updateUser = auth.user

  const[open,setOpen] = useState(false)

  

  const handleClick = async (e) => {
    e.preventDefault();
    const newUser = { ...auth.user, name, email }

    try {
      const response = await axios.post(
          "http://localhost:8080/lmsadmin/updateLmsAdmin", newUser
        );
        // set the state of the user
        const user = response.data
        console.log(user)
        auth.login(user)   
        props.closeModalFunc()
        
        
  } catch (error) {
      // Handle error here
      console.log(error.message)
  }
}


  const handleCancel = () => {
    props.closeModalFunc();
    console.log("child cancel called");
  };


  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          //m: 1,
          // width: '25ch'
        },
      }}
      noValidate
      autoComplete="off"
    >
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1>
            <u>Add LMS Admin</u>
          </h1>
          <br></br>
          <TextField
            id="outlined-basic"
            label="LMS Admin Name"
            variant ="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="LMS Admin Email"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <br />
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button> 
          <br></br>
          <br></br>

          <Button variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}