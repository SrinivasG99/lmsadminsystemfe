import * as React from 'react';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from 'react-router-dom';


import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import LogoutIcon from '@mui/icons-material/Logout';



import '../css/Appbar.css';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';

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
  const user = auth.user;
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }


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
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (<>

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundImage: "linear-gradient(to right, #413C58, #A3C4BC)" }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            style={{ marginLeft: "40px", fontWeight: "1000px" }}
          >
            EduCouch
          </Typography>
          <div style={{ marginLeft: "auto" }}>
            <Box sx={{ flexGrow: 0 }}>
              <div style={{ float: 'left', paddingRight: 10 }}>
                <Typography variant="body2">Name: {user.name}</Typography>
                <Typography variant="body2">Role: LMS Admin</Typography>
              </div>
              <div style={{ float: 'right' }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                    style={{ marginLeft: "auto" }}
                  >
                    <Avatar alt="avatar" src={user.profilePicture} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link
                    to="/myProfile"
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={handleCloseUserMenu}
                  >
                    <MenuItem style={{ justifyContent: "center" }}>
                      <AccountCircleIcon color="disabled" />
                      &nbsp;
                      <Typography>Profile</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem
                    style={{ justifyContent: "center" }}
                    onClick={handleLogout}
                  >
                    <LogoutIcon color="disabled" />
                    &nbsp;
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Menu>
              </div>
            </Box>
          </div>
        </Toolbar>
        <nav className="navbar">
          <div className="navbar-container">
            <ul className={'nav-menu'}>
              <li className='nav-item'>
                <Link to='/LmsAdminManagement' className='nav-links'>
                  LMS Management
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/PendingApprovalReq' className='nav-links'>
                  Organization Management
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/myTeachingCoursesList' className='nav-links'>
                  Courses
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/learnerTransaction' className='nav-links'>
                  Transactions
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/pendingReelApprovals' className='nav-links'>
                  Reels
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/rewardsPage' className='nav-links'>
                  Rewards
                </Link>
              </li>


            </ul>

          </div>
        </nav>
      </AppBar>
    </Box>
    <div style={{ height: "150px" }}></div>
  </>
  );
}
