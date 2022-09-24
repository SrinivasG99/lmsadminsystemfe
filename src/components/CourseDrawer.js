import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom'
import ListItemIcon from '@mui/material/ListItemIcon';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import StyleIcon from '@mui/icons-material/Style';

import '../css/DrawerLeft.css';

function CourseDrawer(props) {

  const drawer = (
    <div>
      <div className='drawerContainer'>
        <List>
          {['List of Courses'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to="/myTeachingCoursesList">
                <ListItemIcon>
                  <LaptopChromebookIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Tags'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to="/tags">
                <ListItemIcon>
                  <StyleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </div>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '12%', top: '123px' },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default CourseDrawer;
