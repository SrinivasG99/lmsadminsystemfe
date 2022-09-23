import { AppBar, Button, Chip, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { useAuth } from '../context/AuthProvider';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
const OrgAdmin = () => {
    const [admins, setAdmins] = useState([]);

    const handleOnClick = async (e,orgAdmin) => {
      e.preventDefault();
      var activityState = !orgAdmin.row.active
      console.log(activityState)

      const updateOrgAdmin = { ...orgAdmin.row, active : activityState }
      console.log(updateOrgAdmin);
  
      try {
        const response = await axios.post(
            "http://localhost:8080/educator/updateOrgAdmin", updateOrgAdmin
          );
          // set the state of the user
          const user = response.data
          console.log(user)
          
          
    } catch (error) {
        // Handle error here
        console.log(error.message)
    }
  };

    const columns = [
        { field: 'organisationAdminId', headerName: 'Organisation Admin ID', width: 200},
        { field: 'name', headerName: 'Name', width: 200},
        { field: 'email', headerName: 'Email', width: 200},
        {
          field: 'username',
          headerName: 'Username',
          width: 200
        },
        {
          field: 'active',
          headerName: 'Active Status',
          width: 200
        },
        {
          headerName: 'Action',
          width: 200,
          renderCell: (params) => {
            return(
              <Button
                variant="contained"
                size="small"
                tabIndex={params.hasFocus ? 0 : -1}
                onClick={(event) => {
                  handleOnClick(event,params);
                }}
              >
                {params.row.active? "Disable" : "Enable"} User
              </Button>
            );
            },
        },
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