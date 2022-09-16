import * as React from 'react';
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useAuth } from "../context/AuthProvider";



import '../css/Appbar.css';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Appbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const auth = useAuth()


  const showButton = () => {
      if (window.innerWidth <= 960) {
          setButton(false);
      } else {
          setButton(true);
      }
  }

  useEffect(() => {
      showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  if (auth.user) {
  return (<>

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
            <Typography variant="h6" noWrap component="div" style={{marginLeft:"40px"}}>
              EduCouch
            </Typography>
            <div style={{marginLeft:"auto"}}>
              <ul className={'top-nav-menu'}>
                  <li>
                      <Link to ='/settings' className='top-nav-links'>
 
                      </Link>
                  </li>
                  <li>
                      <Link to ='/learnerCreation' className='top-nav-links'>

                      </Link>
                  </li>
              </ul>
            </div>
        </Toolbar>
        <nav className="navbar">
            <div className="navbar-container">
                <ul className={'nav-menu'}>
                    <li className='nav-item'>
                        <Link to ='/LmsAdminManagement' className='nav-links'>
                            Lms Admin Management
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
      </AppBar>
    </Box>
    <div style={{height:"150px"}}></div>
    </>
  );
  } else {
    return <></>
  }
}
