import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Educouch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
    const auth = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [usernameError, setUsernameError] = React.useState({ value: false, errorMessage: '' })
    const [passwordError, setPasswordError] = React.useState({ value: false, errorMessage: '' })

    
    auth.logout()
  const handleSubmit = async (event) => {
    event.preventDefault();
    setPasswordError({ value: false, errorMessage: '' })
    setUsernameError({ value: false, errorMessage: '' })


    if (password == '') {
      setPasswordError({ value: true, errorMessage: 'You must enter a password' })
    }
    if (username == '') {
      setUsernameError({ value: true, errorMessage: 'You must enter a username' })
    }
if(password && username) {
    try {
        const response = await axios.post(
            `http://localhost:8080/lmsadmin/login?username=${username}&password=${password}`
          );
          // set the state of the user
          // store the user in localStorage
          const user = response.data
          auth.login(response.data)
          console.log(response.data)      
          navigate('/LmsAdminManagement')  
    } catch (error) {
        // Handle error here
        console.log(error.message)
        setPasswordError({ value: true, errorMessage: 'User does not exist or password does not match' })
        setUsernameError({ value: true, errorMessage: 'User does not exist or password does not match' })
    }

  }

      
  };

  return (
    <Box   position="fixed"
  top={0}
  height="100%"
  width="100%"
  bgcolor={'#13215f'}
  >
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5" color={"white"}>
            LMS Admin Portal
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="username"
            //   autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              error={usernameError.value}
              helperText={usernameError.errorMessage}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            //   autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError.value}
            helperText={passwordError.errorMessage}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </Box>
  );
}