import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom'

import '../css/DrawerLeft.css';

function TransactonSideBar(props) {

  const drawer = (
    <div>
      <div className='drawerContainer'>
        <List>
            {['Learner Transactions'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to="/learnerTransaction">
                <ListItemText primary={text} />
                </ListItemButton>
            </ListItem> 
            ))}
        </List>
        <Divider />
            <List>
                {['Organisation Payment'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton component={Link} to="/orgBalance">
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['LMS Transactions'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton component={Link} to="/lmsTransaction">
                    <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Refund Requests'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton component={Link} to="/refund">
                    <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
                </List>
                <Divider />
            <List>
                {['Refund Transactions'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton component={Link} to="/refundTransactions">
                    <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
                </List>
            <Divider />
            <Divider />
      </div>
    </div>
  );

  return (
    <Box sx={{ display: 'flex'}}>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '12%' , top: '123px'},
          }}
          open
        >
          {drawer}
        </Drawer>
    </Box>
  );
}

export default TransactonSideBar;
