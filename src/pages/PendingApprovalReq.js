import { Chip, Divider, Grid} from '@mui/material';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import OrgApprovalSideBar from '../components/OrgApprovalSideBar';
const PendingApproval = () => {
    const [approvals, setApprovals] = useState([]);


    const columns = [
        { field: 'orgAdminApprovalId', headerName: 'Organisation Admin Request ID', width: 300},
        { field: 'adminName', headerName: 'Name', width: 300},
        { field: 'adminEmail', headerName: 'Email', width: 300},
        {
          field: 'adminNumber',
          headerName: 'Phone Number',
          width: 300
        },
        {
          field: 'orgName',
          headerName: 'Name of Organisation',
          width: 300
        }
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