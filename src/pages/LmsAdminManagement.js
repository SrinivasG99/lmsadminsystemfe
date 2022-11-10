import { AppBar, Typography, Button, Chip, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { useAuth } from '../context/AuthProvider';
import { DataGrid } from '@mui/x-data-grid';
import CreateLmsAdminForm from '../components/CreateLmsAdminForm';

const LmsAdminManagement = () => {
const auth = useAuth()
const [admins, setAdmins] = useState([]);
const [open, setOpen] = React.useState(false);


const handleOpen = () => setOpen(true);
function handleClose(ed) {
  setOpen(false);
}

const addAdmin = (newAdmin) => {
  setAdmins(oldArray =>[...oldArray, newAdmin])

}

const columns = [
  { field: 'lmsAdminId', headerName: 'LMS Admin ID', width: 300},
  { field: 'name', headerName: 'Name', width: 300},
  { field: 'email', headerName: 'Email', width: 300},
  {
    field: 'username',
    headerName: 'Username',
    width: 300
  }
];
React.useEffect(() => {
  fetch("http://localhost:8080/lmsadmin/getAll")
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
                  <center><Typography variant = "h4">View All Admins</Typography></center>
                
                <div>
                <Button
            className="btn-choose"
            variant="outlined"
            type="submit"
            onClick={handleOpen}


          >
            Create new LMS Admin
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <CreateLmsAdminForm addToList={addAdmin}
              closeModalFunc={handleClose}
            ></CreateLmsAdminForm>
          </Modal>
          </div>
          <br></br>

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid getRowId={(row)=>row.lmsAdminId}
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
</div>
    );
  };
  export default LmsAdminManagement;