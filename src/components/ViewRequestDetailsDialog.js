import { Button, Dialog, Grid, Paper } from "@mui/material";

export default function ViewRequestDetailsDialog(props) {
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <Paper elevation={3}>
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
          >
            <h1>View Request Details</h1>
          </Paper>
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
          >
            <b>Request Description:</b> {props.currReq.requestDescription}
            <br />
            <b>Submitted Attachments: </b>
            <br />
          </Paper>
        </Paper>
        <Button onClick={props.onClose}>Close</Button>
      </Dialog>
    </div>
  );
}
