import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import {
  Button, Typography, TextField,
  Dialog, DialogActions, DialogContent,
  DialogContentText, Box
} from '@mui/material';
import { DataGrid, selectedGridRowsCountSelector, selectedGridRowsSelector } from '@mui/x-data-grid';
import CourseDrawer from '../components/CourseDrawer';
import InstantSuccessMessage from '../components/InstantSuccessMessage';
import InstantErrorMessage from '../components/InstantErrorMessage';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


const columns = [
  { field: 'categoryTagId', headerName: 'ID', width: 70 },
  { field: 'tagName', headerName: 'Tag name', width: 250 }

];

export default function Tags() {

  // data table
  const [rows, setRows] = useState([]);

  const refresh = () => {
    fetch("http://localhost:8080/categoryTag/getAll").
      then(res => res.json()).
      then((result) => {
        setRows(result);

      }
      );
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/categoryTag/getAll").
      then(res => res.json()).
      then((result) => {
        console.log('Result is ' + JSON.stringify(result));
        setRows(result);

      }
      )
  }, []);

  // notification
  const [message, setMessage] = useState('');
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  // create new tag dialog box
  const [createNewTagDialogBox, setCreateNewTagDialogBox] = useState(false);

  const openCreateNewTagDialogBox = () => {
    setCreateNewTagDialogBox(true);
  };

  const closeCreateNewTagDialogBox = () => {
    setCreateNewTagDialogBox(false);
  };

  // new tag name
  const [newTagName, setNewTagName] = useState('');

  // create new tag
  const createNewTag = () => {
    fetch("http://localhost:8080/categoryTag/createNewCategoryTag?categoryTagName=" + newTagName)
      .then(() => {
        closeCreateNewTagDialogBox();
        //notification
        setMessage("Tag is successfully created!");
        setError(false);
        setSuccess(true);
        refresh();
        setNewTagName("");


      }).catch((error) => {
        //notification
        setMessage("Could not create tag: " + error);
        setError(true);
        setSuccess(false);
        setNewTagName("");
        console.log(error);

      })
  };

  // delete new tag
  const deleteTag = () => {
    fetch("http://localhost:8080/categoryTag/deleteCategoryTag/" + selectedRow[0],{
      method:"DELETE"
    })
      .then(() => {
        closeCreateNewTagDialogBox();
        //notification
        setMessage("Tag is successfully deleted!");
        setError(false);
        setSuccess(true);
        refresh();


      }).catch((error) => {
        //notification
        setMessage("Could not delete tag: " + error);
        setError(true);
        setSuccess(false);
        alert(error);

      })
  };

  // datagrid handling
  const [selectedRow, setSelectedRow] = useState(null);

  // rename dialog box
  const [renameDialogBox, setRenameDialogBox] = useState(false);

  const openRenameDialogBox = () => {
    setRenameDialogBox(true);
  };

  const closeRenameDialogBox = () => {
    setRenameDialogBox(false);
  };

  // new rename
  const[renameField, setRenameField] = useState('');

  return (
    <>
      {message && isError && (
        <InstantErrorMessage message={message}></InstantErrorMessage>
      )}
      {message && isSuccess && (
        <InstantSuccessMessage message={message}></InstantSuccessMessage>
      )}
      <div>

        <Grid container>
          <Grid item xs={1}>
            <CourseDrawer></CourseDrawer>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h4" style={{ paddingLeft: '6rem' }}>
              List of tags
            </Typography>
            <h1>{selectedGridRowsSelector.getRowId}</h1>

            <br />
            <Button variant="outlined" startIcon = {<AddIcon/>} style={{ marginLeft: '6rem' }} onClick={openCreateNewTagDialogBox}>Create</Button>
            <Button variant="outlined" startIcon={<DeleteIcon />} disabled = {!selectedRow} onClick = {deleteTag}>
              Delete
            </Button>
            <br />
            <br />

            <div style={{ marginLeft: '6em', height: 400, width: '100%' }}>
              <DataGrid
                getRowId={(row) => row.categoryTagId}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onSelectionModelChange={(newSelection) => { 
                  setSelectedRow(newSelection);
                }}
              />
            </div>

          </Grid>
        </Grid>

      </div>
      
      <Dialog open={createNewTagDialogBox} onClose={closeCreateNewTagDialogBox} fullWidth="lg">
        <DialogContent>
          <DialogContentText>
            Create a new tag
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="newTagNameField"
            label="New tag name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewTagName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={createNewTag} disabled={newTagName == ''}>Create</Button>
          <Button onClick={closeCreateNewTagDialogBox}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={renameDialogBox} onClose={closeRenameDialogBox} fullWidth="lg">
        <DialogContent>
          <DialogContentText>
            Rename Tag
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="newTagNameField"
            label="New tag name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setRenameField(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button disabled={renameField == ''}>Rename</Button>
          <Button onClick={closeRenameDialogBox}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}