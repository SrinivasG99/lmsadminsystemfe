import { Button, Chip, Divider, Grid, Modal} from '@mui/material';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import OrgApprovalSideBar from '../components/OrgApprovalSideBar';
import axios from 'axios';
import RejectDialog from '../components/RejectDialog';
import ViewOrgAdminApprovalReq from "../components/ViewOrgAdminApprovalReq";
import CheckDialog from '../components/CheckDialog';
const PendingApproval = () => {
    const [approvals, setApprovals] = useState([]);
    const [refreshArr, setRefreshArr] = useState(true);
    const [currReq, setCurrReq] = useState(undefined)
    const [open, setOpen] = React.useState(false);
    const [openCheck, setOpenCheck] = React.useState(false);


    const [openRejDialog, setOpenRejDialog] = React.useState(false);
  
const handleOpenRejDialog = (event,params) => {
    setCurrReq(params.row)
  setOpenRejDialog(true);
};

const refresh = () => {
  setRefreshArr(!refreshArr)
}

const handleCloseRejDialog = () => {
  setOpenRejDialog(false);
};


const handleOpenCheck = (event,params) => {
  setCurrReq(params.row)
setOpenCheck(true);
};


const handleCloseCheck = () => {
setOpenCheck(false);
};



const handleOpen = (event,param) => {
  setCurrReq(param.row)
  setOpen(true);
}
function handleClose(ed) {
  setOpen(false);
}

  
  const columns = [
    {
      field: "orgAdminApprovalId",
      headerName: "Organisation Admin Request ID",
      width: 300,
    },
    { field: "adminName", headerName: "Name", width: 200 },
    { field: "adminEmail", headerName: "Email", width: 200 },
    {
      field: "adminNumber",
      headerName: "Phone Number",
      width: 200,
    },
    {
      field: "orgName",
      headerName: "Name of Organisation",
      width: 200,
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
                handleOpen(event, params);
              }}
            >
              View Details
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ViewOrgAdminApprovalReq
                closeModalFunc={handleClose}
                approvalReq={currReq}
              ></ViewOrgAdminApprovalReq>
            </Modal>
            &nbsp;&nbsp;&nbsp;
            <Button
              variant="contained"
              size="small"
              tabIndex={params.hasFocus ? 0 : -1}
              onClick={(event) => {
                handleOpenCheck(event, params);
              }}
            >
              Approve Request
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              variant="contained"
              size="small"
              tabIndex={params.hasFocus ? 0 : -1}
                  onClick={(event) => {
                    handleOpenRejDialog(event,params);
                  }}
            >
              Reject Request
            </Button>
          </div>
        );
      },
    },
  ];
  React.useEffect(() => {
    fetch("http://localhost:8080/orgAdminApprovalReq/getAllPending")
      .then((res) => res.json())
      .then((result) => {
        setApprovals(result);
      });
  }, [refreshArr]);


  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <OrgApprovalSideBar />
        </Grid>
        <Grid item xs={10}>
          <h1>View All Pending Requests</h1>

          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.orgAdminApprovalId}
              rows={approvals}
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
      <RejectDialog
      refresh={refresh}
      open={openRejDialog}
      onClose={handleCloseRejDialog}
      currReq={currReq}
      ></RejectDialog>
      <CheckDialog
      refresh={refresh}
      open={openCheck}
      onClose={handleCloseCheck}
      currReq={currReq}
      >
      </CheckDialog>
      </div>)
};

export default PendingApproval;
