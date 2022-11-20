import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

import "../css/DrawerLeft.css";

function ReelsSideBar(props) {
  const drawer = (
    <div>
      <div className="drawerContainer">
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/pendingReelApprovals">
              <ListItemText primary="Pending Reels" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/approvedReels">
              <ListItemText primary="Approved Reels" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/rejectedReels">
              <ListItemText primary="Rejected Reels" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Divider />
      </div>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "12%",
            top: "123px",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default ReelsSideBar;
