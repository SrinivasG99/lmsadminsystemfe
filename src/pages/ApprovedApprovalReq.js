import { Button, Chip, Divider, Grid, Modal} from '@mui/material';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import OrgApprovalSideBar from '../components/OrgApprovalSideBar';
import ViewOrgAdminApprovalReq from '../components/ViewOrgAdminApprovalReq';
const ApprovedApproval = () => {
    const [approvals, setApprovals] = useState([]);
    const [open, setOpen] = useState(false);
    const [currReq, setCurrReq] = useState(undefined)


    const handleOpen = (event,param) => {
      setCurrReq(param.row)
      setOpen(true);
    }
    function handleClose(ed) {
      setOpen(false);
    }

    const columns = [
        { field: 'orgAdminApprovalId', headerName: 'Organisation Admin Request ID', width: 300},
        { field: 'adminName', headerName: 'Name', width: 200},
        { field: 'adminEmail', headerName: 'Email', width: 300},
        {
          field: 'adminNumber',
          headerName: 'Phone Number',
          width: 200
        },
        {
          field: 'orgName',
          headerName: 'Name of Organisation',
          width: 200
        },
        {
            headerName: 'Action',
            width: 500,
            renderCell: (params) => {
              return(
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
                </div>
              );
              },
          },
      ];
      React.useEffect(() => {
        fetch("http://localhost:8080/orgAdminApprovalReq/getAllApproved")
          .then((res) => res.json())
          .then((result) => {
            setApprovals(result);
          });
      }, []);
      
    return (
        <div>

        <Grid container spacing={0}>
                      <Grid item xs={2}>
                          <OrgApprovalSideBar/>
      
      
                          </Grid>
                      <Grid item xs={10}>
                      <h1>View All Approved Requests</h1>

 
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid getRowId={(row)=>row.orgAdminApprovalId}
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
      </div>)
};

export default ApprovedApproval;