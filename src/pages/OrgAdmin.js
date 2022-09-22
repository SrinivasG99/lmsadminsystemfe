import { AppBar, Button, Chip, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { useAuth } from '../context/AuthProvider';
import { DataGrid } from '@mui/x-data-grid';
const OrgAdmin = () => {
    const [admins, setAdmins] = useState([]);


    const columns = [
        { field: 'organisationAdminId', headerName: 'Organisation Admin ID', width: 300},
        { field: 'name', headerName: 'Name', width: 300},
        { field: 'email', headerName: 'Email', width: 300},
        {
          field: 'username',
          headerName: 'Username',
          width: 300
        },
        {
          field: 'active',
          headerName: 'Active Status',
          width: 300
        }
      ];
      React.useEffect(() => {
        fetch("http://localhost:8080/educator/getAllOrgAdmin")
          .then((res) => res.json())
          .then((result) => {
            setAdmins(result);
          });
      }, []);
      
    return (
        <div>

        <Grid container spacing={0}>
                      <Grid item xs={2}>
                          <SideBar/>
      
      
                          </Grid>
                      <Grid item xs={10}>
                      <h1>View All Organisation Admins</h1>

 
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid getRowId={(row)=>row.organisationAdminId}
              rows={admins}
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

export default OrgAdmin;