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
import ForestIcon from '@mui/icons-material/Forest';
import CollectionsIcon from '@mui/icons-material/Collections';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';


import '../css/DrawerLeft.css';

function RewardsDrawer(props) {

  const drawer = (
    <div>
      <div className='drawerContainer'>
        <List>
          {['Reward Items'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to="/rewardsPage">
                <ListItemIcon>
                  <CollectionsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Create New Item'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to="/createNewReward">
                <ListItemIcon>
                  <ForestIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Enhancement Items'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to="/listOfEnhancementItems">
                <ListItemIcon>
                  <AutoFixNormalIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Create New Enhancement'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to="/createNewEnhancement">
                <ListItemIcon>
                  <AutoGraphIcon fontSize="small" />
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

export default RewardsDrawer;
