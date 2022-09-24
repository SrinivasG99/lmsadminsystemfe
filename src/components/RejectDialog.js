import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import { Input, TextField } from '@mui/material';

export default function RejectDialog(props) {
    const [rejMessage, setRejMessage] = React.useState("")

    const handleReject = async (e) => {
        e.preventDefault();
        const reqToReject =  {...props.currReq, rejMessage}
    
        try {
          const response = await axios.post(
              "http://localhost:8080/orgAdminApprovalReq/rejectOrgAdmin", reqToReject
            );
            // set the state of the user
            console.log(response.data)
            props.refresh()
            props.onClose()

            
      } catch (error) {
          // Handle error here
          console.log(error.message)
      }
    } 

    return (
      <div>
        <Dialog
          open={props.open}
          onClose={props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Reject Organisation Admin Request"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Please provide some feedback on why the request was rejected
            </DialogContentText>

          </DialogContent>
          <TextField
          margin=''
          id="standard-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="standard"
          value={rejMessage}
          onChange={(e) => setRejMessage(e.target.value)}
        />
          <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={handleReject} autoFocus disabled={rejMessage.length === 0}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  