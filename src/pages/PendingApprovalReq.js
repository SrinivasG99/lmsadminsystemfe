import { Button, Chip, Divider, Grid} from '@mui/material';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import OrgApprovalSideBar from '../components/OrgApprovalSideBar';
import axios from 'axios';
const PendingApproval = () => {
    const [approvals, setApprovals] = useState([]);

    const handleApproval = async (e,params) => {
        console.log(params.row)
        const appReq = params.row;

    
        try {
          const response = await axios.post(
              "http://localhost:8080/orgAdminApprovalReq/approveOrgAdmin", appReq
            );
            // set the state of the user
            const reply = response.data
            console.log(reply)
            
            
      } catch (error) {
          // Handle error here
          console.log(error.message)
      }
    }

    const columns = [
        { field: 'orgAdminApprovalId', headerName: 'Organisation Admin Request ID', width: 300},
        { field: 'adminName', headerName: 'Name', width: 200},
        { field: 'adminEmail', headerName: 'Email', width: 200},
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
                //   onClick={(event) => {
                //     handleOnClick(event,params);
                //   }}
                >
                  View Details
                </Button> 
                &nbsp;&nbsp;&nbsp;
                <Button
                  variant="contained"
                  size="small"
                  tabIndex={params.hasFocus ? 0 : -1}
                  onClick={(event) => {
                    handleApproval(event,params);
                  }}
                >
                  Approve Request
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  variant="contained"
                  size="small"
                  tabIndex={params.hasFocus ? 0 : -1}
                //   onClick={(event) => {
                //     handleOnClick(event,params);
                //   }}
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
      }, []);
      
    return (
        <div>

        <Grid container spacing={0}>
                      <Grid item xs={2}>
                          <OrgApprovalSideBar/>
      
      
                          </Grid>
                      <Grid item xs={10}>
                      <h1>View All Pending Requests</h1>

 
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

export default PendingApproval;