import { Button, Chip, Divider, Grid, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import CourseDrawer from "../components/CourseDrawer";
import OrgApprovalSideBar from "../components/OrgApprovalSideBar";
import ReelsSideBar from "../components/ReelsSideBar";
import ViewReel from "../components/ViewReel";
import { useLocation, useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";

export default function PendingReelApprovals() {
  const [pendingReels, setPendingReels] = useState([]);
  const [currReq, setCurrReq] = useState(undefined);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  // const handleOpen = (event, param) => {
  //   setCurrReq(param.row);
  //   console.log("handleOpen, param.row: ", param);
  //   setOpen(true);
  // };
  // function handleClose(ed) {
  //   setOpen(false);
  // }

  const handleClick = (event, param) => {
    navigate(`/viewReel`, {
      state: {
        // refreshFunc: triggerRefresh,
        reel: param.row,
        reelId: param.row.reelId,
      },
    });
  };
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
              // onClick={(event) => {
              //   handleOpen(event, params);
              // }}
              onClick={(event) => {
                handleClick(event, params);
              }}
            >
              View Reel Details
            </Button>
            {/* <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ViewReel
                // closeModalFunc={handleClose}
                refreshFunc={triggerRefresh}
                reel={currReq}
                // reelId={reelId}
              ></ViewReel>
            </Modal> */}
          </div>
        );
      },
    },
  ];
  const [refreshArr, setRefreshArr] = useState(true);
  function triggerRefresh() {
    setRefreshArr(!refreshArr);
  }

  React.useEffect(() => {
    fetch("http://localhost:8080/reel/getAllPendingReels")
      .then((res) => res.json())
      .then((result) => {
        setPendingReels(result);
        console.log("pendingReels: ", result);
      });
  }, [refreshArr]);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <ReelsSideBar />
        </Grid>
        <Grid item xs={10}>
          <h1>List of Pending Reels</h1>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.reelId}
              rows={pendingReels}
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
