import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function DeleteRefundTransactionDialog(props) {

    const agree = async (e) => {
        e.preventDefault();
        const transactionToDelete =  props.currTransaction
    
        try {
          const response = await axios.post(
              "http://localhost:8080/transaction/deleteRefundTransaction", transactionToDelete
            );
            // set the state of the user
            props.closeDialog()
            props.refresh()
            
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
            {"Are you sure you want to delete this transaction?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                This delete is non-reversible. This transaction will be deleted forever.
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
  