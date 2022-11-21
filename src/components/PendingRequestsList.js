import * as React from "react";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Dialog, Chip, Divider, Paper } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import TechnicalSupportRequestsDrawer from "./TechnicalSupportRequestsDrawer";
import ViewRequestDetailsDialog from "./ViewRequestDetailsDialog";

export default function PendingRequestsList() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [currReq, setCurrReq] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (event, params) => {
    setCurrReq(params.row);
    setOpen(true);
    console.log(currReq);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { field: "requestId", headerName: "Request Id", width: 100 },
    { field: "requestTitle", headerName: "Request Title", width: 200 },
    {
      field: "createdByUserType",
      headerName: "User Type",
      width: 150,
    },
    {
      field: "createdByUserName",
      headerName: "Username",
      width: 150,
    },
    {
      field: "createdDateTime",
      headerName: "Created on",
      width: 300,
    },
    {
      headerName: "Action",
      width: 500,
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="contained"
              size="small"
              tabIndex={params.hasFocus ? 0 : -1}
              onClick={(event) => {
                handleClickOpen(event, params);
              }}
            >
              View more details
            </Button>
            &nbsp;
            <Button
              variant="contained"
              size="small"
              tabIndex={params.hasFocus ? 0 : -1}
              onClick={(event) => {
                handleResolve(event, params);
              }}
            >
              Mark as resolved
            </Button>
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    fetch(
      "http://localhost:8080/technicalSupportRequest/getAllPendingTechnicalSupportRequests"
    )
      .then((res) => res.json())
      .then((result) => {
        setPendingRequests(result);
      });
  }, [pendingRequests]);

  const handleResolve = (event, param) => {
    var requestStatus = "RESOLVED";
    const resolvedRequest = {
      requestStatus,
    };
    fetch(
      "http://localhost:8080/technicalSupportRequest/updateRequestStatus/" +
        param.row.requestId,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resolvedRequest),
      }
    );
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TechnicalSupportRequestsDrawer />
        </Grid>
        <Grid item xs={10}>
          <h1>List of Pending Requests</h1>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.requestId}
              rows={pendingRequests}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
          <br></br>
          <Divider>
            <Chip label="End" />
          </Divider>

          <br></br>
        </Grid>
      </Grid>
      <ViewRequestDetailsDialog
        open={open}
        onClose={handleClose}
        currReq={currReq}
      ></ViewRequestDetailsDialog>
    </div>
  );
}
