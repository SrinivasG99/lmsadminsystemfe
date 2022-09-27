import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';


export default function CheckDialog(props) {
  const [openError, setOpenError] = React.useState(false);

  const handleClickOpenError = () => {
      setOpenError(true);
  };

  const handleCloseError = () => {
      setOpenError(false);
  };

  const handleApproval = async (e) => {
    e.preventDefault();

    const appReq = props.currReq;

    try {
      const response = await axios.post(
        "http://localhost:8080/orgAdminApprovalReq/approveOrgAdmin", appReq
      );
      // set the state of the user
      props.refresh()
      props.onClose()

    } catch (error) {
      // Handle error here
      console.log(error.message)
      handleClickOpenError();
      props.onClose()
    }
  }
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Request Approval"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to approve this request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={handleApproval} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Dialog open={openError} onClose={handleCloseError}>
          <DialogTitle>Error when creating account!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Username has been taken. Unable to accept request.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseError}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
