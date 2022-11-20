import { Button, Chip, Divider, Grid, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import CourseDrawer from "../components/CourseDrawer";
import OrgApprovalSideBar from "../components/OrgApprovalSideBar";
import ReelsSideBar from "../components/ReelsSideBar";
import ViewReel from "../components/ViewReel";

export default function RejectedReels() {
  const [rejectedReels, setRejectedReels] = useState([]);
  const [currReq, setCurrReq] = useState(undefined);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event, param) => {
    setCurrReq(param.row);
    console.log("handleOpen, param.row: ", param)
    setOpen(true);
  };
  function handleClose(ed) {
    setOpen(false);
  }
  const columns = [
    {
      field: "reelId",
      headerName: "Reel ID",
      width: 100,
    },
    { field: "reelTitle", headerName: "Reel Title", width: 200 },
    {
      field: "creatorName",
      headerName: "Reel Creator",
      width: 300,
    },
    {
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="contained"
              size="small"
              tabIndex={params.hasFocus ? 0 : -1}
              onClick={(event) => {
                handleOpen(event, params);
              }}
            >
              View Reel Details
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ViewReel
                closeModalFunc={handleClose}
                reel={currReq}
                // reelId={reelId}
              ></ViewReel>
            </Modal>
          </div>
        );
      },
    },
  ];
  const [refreshArr, setRefreshArr] = useState(true);

  React.useEffect(() => {
    fetch("http://localhost:8080/reel/getAllRejectedReels")
      .then((res) => res.json())
      .then((result) => {
        setRejectedReels(result);
        console.log("rejectedReels: ", result);
      });
  }, [refreshArr]);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <ReelsSideBar />
        </Grid>
        <Grid item xs={10}>
          <h1>List of Rejected Reels</h1>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.reelId}
              rows={rejectedReels}
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
    </div>
  );
}
