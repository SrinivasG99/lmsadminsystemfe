import { Button, Dialog, Grid, Paper } from "@mui/material";

export default function ViewRequestDetailsDialog(props) {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
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
            {props.currReq.imageUrl && (
              <b>
                Submitted Screenshot:
                <img
                  src={props.currReq.imageUrl}
                  alt="Request image"
                  width="100px"
                  height="100px"
                  objectFit="contain"
                  onClick={() => {
                    openInNewTab(props.currReq.imageUrl);
                  }}
                ></img>
              </b>
            )}
            <br />
          </Paper>
        </Paper>
        <Button onClick={props.onClose}>Close</Button>
      </Dialog>
    </div>
  );
}
