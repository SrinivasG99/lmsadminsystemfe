import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import axios from "axios";

import {
  ThemeProvider,
  LinearProgress,
  Typography,
} from "@mui/material";
import {
  Paper,
  Button,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import UploadFilesService from "../services/UploadFilesService";

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

  //upload image states
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);


  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const auth = useAuth()

  const [name, setName] = useState(auth.user.name);
  const [email, setEmail] = useState(auth.user.email);
  const [profilePicture, setProfilePicture] = useState("")

  console.log("User: ", auth.user)
//   const updateUser = auth.user

  const[open,setOpen] = useState(false)

  

  const handleClick = async (e) => {
    e.preventDefault();
    const newUser = { ...auth.user, name, email, profilePicture }

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

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage("");
  };

  const uploadImage = () => {
    setProgress(0);
    UploadFilesService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage("Succesfully Uploaded!");
        setProfilePicture(response.data.fileURL);
        setIsError(false);
        setIsUploaded(true);
        console.log(response);
      })
      .catch((err) => {
        setMessage("Could not upload the image!");
        setIsError(true);
        setProgress(0);
        setCurrentFile(undefined);
      });
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
            <u>Edit LMS Admin</u>
          </h1>
          <br></br>
          {previewImage && (
            <div>
              <img
                className="preview my20"
                src={previewImage}
                alt=""
                style={{ height: "40%", width: "40%" }}
              />
            </div>
          )}
          {currentFile && (
            <Box className="my20" display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <ThemeProvider theme={theme}>
                  <LinearProgress variant="determinate" value={progress} />
                </ThemeProvider>
              </Box>
              <Box minWidth={35}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >{`${progress}%`}</Typography>
              </Box>
            </Box>
          )}
          {message && (
            <Typography
              variant="subtitle2"
              className={`upload-message ${isError ? "error" : ""}`}
            >
              {message}
            </Typography>
          )}
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={selectFile}
            />
            <Button className="btn-choose" variant="outlined" component="span">
              Choose Profile Image
            </Button>
          </label>
          <Button
            className="btn-upload"
            color="primary"
            variant="contained"
            component="span"
            disabled={!currentFile}
            onClick={uploadImage}
          >
            Upload
          </Button>
          <br />
          <br />
          <br />
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