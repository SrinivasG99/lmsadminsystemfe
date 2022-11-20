import { Grid, Typography } from "@mui/material";
import CourseDrawer from "../components/CourseDrawer";
import OrgApprovalSideBar from "../components/OrgApprovalSideBar";
import ReelsSideBar from "../components/ReelsSideBar";

export default function RejectedReels() {
  return (
    <Grid container>
      <Grid item xs={1}>
        <ReelsSideBar />
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h4" style={{ paddingLeft: "6rem" }}>
          List of Rejected Reels
        </Typography>
      </Grid>
    </Grid>
  );
}
