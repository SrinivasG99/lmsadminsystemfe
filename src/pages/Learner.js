import { AppBar, Button, Chip, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { useAuth } from '../context/AuthProvider';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
const Learner = () => {
    const [admins, setAdmins] = useState([]);
    const [refreshArr, setRefreshArr] = useState(true);

    const handleOnClick = async (e,learner) => {
      e.preventDefault();
      var activityState = !learner.row.active
      console.log(activityState)

      const updateLearner = { ...learner.row, active : activityState }
      console.log(updateLearner);
  
      try {
        const response = await axios.post(
            "http://localhost:8080/learner/update", updateLearner
          );
          // set the state of the user
          const user = response.data
          console.log(user)
          setRefreshArr(!refreshArr)
          
    } catch (error) {
        // Handle error here
        console.log(error.message)
    }
  };

    const columns = [
        { field: 'learnerId', headerName: 'Learner ID', width: 200},
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
        fetch("http://localhost:8080/learner/getAll")
          .then((res) => res.json())
          .then((result) => {
            setAdmins(result);
            console.log(result)
          });
      }, [refreshArr]);
      
    return (
        <div>

        <Grid container spacing={0}>
                      <Grid item xs={2}>
                          <SideBar/>
      
      
                          </Grid>
                      <Grid item xs={10}>
                      <h1>View All Learners</h1>

 
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid getRowId={(row)=>row.learnerId}
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

export default Learner;