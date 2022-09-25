import { Button, Card, CardActions, CardContent, CardMedia, Grid, Modal, Typography } from "@mui/material"
import React, { useContext, useState } from "react"
import SideBar from "../components/SideBar";
import UpdateLmsAdminForm from "../components/UpdateLmsAdminForm";
import { useAuth } from "../context/AuthProvider";
import NoProfilePic from "../assets/NoProfilePic.jpg"
import AlertDialog from "../components/AlertDialog";

const MyProfile = () => {
    const auth = useAuth();
    // console.log("auth ", auth)
    const user = auth.user
    console.log(user)
//for delete profile dialog
const [openDialog, setOpenDialog] = React.useState(false);
  
const handleClickOpenDialog = () => {
  setOpenDialog(true);
};

const handleCloseDialog = () => {
  setOpenDialog(false);
};




    //For edit profile modal
    const[open,setOpen] = useState(false)

    const handleOpen = () => setOpen(true);
function handleClose(ed) {
  setOpen(false);
}
    return (
        <div>

        <Grid container spacing={0}>
        <Grid item xs={2}>
            <SideBar/>


            </Grid>
        <Grid item xs={3}>
            <Card >
            <CardMedia
        component="img"
        height="500"
        image={user.profilePicture ? user.profilePicture : NoProfilePic}
        alt=""
      />
            <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
    {user.name}        </Typography>
    <Typography gutterBottom variant="h5" component="div">
          Email
        </Typography>
        <Typography variant="body2" color="text.secondary">
    {user.email}        </Typography>
    </CardContent>
    <CardActions>
        <Button size="small" onClick={handleOpen}>Edit Profile</Button>
        <Button size="small" onClick={handleClickOpenDialog}>Delete Account</Button>
      </CardActions>

            </Card>
            </Grid>
</Grid>
<Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <UpdateLmsAdminForm
              closeModalFunc={handleClose}
            ></UpdateLmsAdminForm>
          </Modal>
          <AlertDialog
          isOpen={openDialog}
          closeDialog={handleCloseDialog}>

          </AlertDialog>
        </div>
    )
}

export default MyProfile;