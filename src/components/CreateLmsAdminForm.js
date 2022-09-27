import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import axios from "axios";

import {
  Paper,
  Button,
} from "@mui/material";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateLmsAdminForm(props) {
  const addToList = props.addToList

  const [openError, setOpenError] = React.useState(false);

  const handleClickOpenError = () => {
    setOpenError(true);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };


  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");

  const [nameError, setNameError] = useState({ value: false, errorMessage: '' })
  const [emailError, setEmailError] = useState({ value: false, errorMessage: '' })
  const [usernameError, setUsernameError] = useState({ value: false, errorMessage: '' })
  const [passwordError, setPasswordError] = useState({ value: false, errorMessage: '' })
  const [confirmPasswordError, setConfirmPasswordError] = useState({ value: false, errorMessage: '' })

  const handleClick = async (e) => {
    e.preventDefault();

    setNameError({ value: false, errorMessage: '' })
    setEmailError({ value: false, errorMessage: '' })
    setUsernameError({ value: false, errorMessage: '' })
    setPasswordError({ value: false, errorMessage: '' })
    setConfirmPasswordError({ value: false, errorMessage: '' })

    if (name === '') {
      setNameError({ value: true, errorMessage: 'You must enter a name' })
    }
    if (email === '') {
      setEmailError({ value: true, errorMessage: 'You must enter a email' })
    }
    if (!email.includes("@") || !email.includes(".com")) {
      setEmailError({ value: true, errorMessage: 'Invalid Email Address format' })

    }
    if (username === '') {
      setUsernameError({ value: true, errorMessage: 'You must enter a username' })
    }
    if (password === '') {
      setPasswordError({ value: true, errorMessage: 'You must enter a password' })
    }
    if (confirmPassword === '') {
      setConfirmPasswordError({ value: true, errorMessage: 'You must confirm your password' })
    }
    if (confirmPassword !== password) {
      setPasswordError({ value: true, errorMessage: 'Password does not match confirm password' })
      setConfirmPasswordError({ value: true, errorMessage: 'Password does not match confirm password' })
    }
    else if (name && email && username && password && confirmPassword) {
      const lmsAdmin = { name, email, password, username };
      try {
        const response = await axios.post(
          "http://localhost:8080/lmsadmin/addLmsAdmin", lmsAdmin
        );
        // set the state of the user
        // store the user in localStorage
        console.log(response)
        const user = response.data
        addToList(user)
        console.log(user)
        props.closeModalFunc()


      } catch (error) {
        // Handle error here
        console.log(error.message)
        handleClickOpenError();
      }
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
            label="Name"
            variant="outlined"
            required
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError.value}
            helperText={nameError.errorMessage}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError.value}
            helperText={emailError.errorMessage}
          />

          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            required
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError.value}
            helperText={usernameError.errorMessage}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            required
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError.value}
            helperText={passwordError.errorMessage}
            type="password"
          />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            required
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={confirmPassword}
            onChange={(e) => setConfirmPasword(e.target.value)}
            error={confirmPasswordError.value}
            helperText={confirmPasswordError.errorMessage}
            type="password"
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
      <div>
        <Dialog open={openError} onClose={handleCloseError}>
          <DialogTitle>Error when creating account!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Username has been taken. Unable to create this account, please use another username.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseError}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
