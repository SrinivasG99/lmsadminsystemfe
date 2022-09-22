import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';

export default function AlertDialog(props) {
    const auth = useAuth()
    const user = auth.user;
    const agree = async (e) => {
        e.preventDefault();
        const userToDelete =  user
    
        try {
          const response = await axios.post(
              "http://localhost:8080/lmsadmin/deleteLmsAdmin", userToDelete
            );
            // set the state of the user
            const userId = response.data
            console.log(userId)
            auth.logout()   
            props.closeDialog()
            
      } catch (error) {
          // Handle error here
          console.log(error.message)
      }
    }

    return (
      <div>
        <Dialog
          open={props.isOpen}
          onClose={props.closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete your account?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                This delete is non-reversible. Your account will be deleted forever.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.closeDialog}>Disagree</Button>
            <Button onClick={agree} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  