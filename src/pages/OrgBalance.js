import { Box, Chip, Divider, Grid, Modal } from "@mui/material";
import TransactonSideBar from "../components/TransactionSideBar";

import { Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import CreateTransactionModal from "../components/CreateTransactionModal";
import { darken, lighten } from '@mui/material/styles';

const OrgBalance = () => {
const [organisations, setOrganisations] = useState([]);
const [open, setOpen] = React.useState(false);
const [currOrg, setCurrOrg] = useState({})
const [refresh, setRefesh] = useState(false)

const refreshPage = ()=> {
  setRefesh(!refresh)
}

const handleOpen = (event, params) => {
  setCurrOrg(params.row)
  setOpen(true)
}

const handleClose = () => {
  setOpen(false)
}


const columns = [
  { field: 'organisationId', headerName: 'Organisation ID', width: 400},
  { field: 'organisationName', headerName: 'Name', width: 400},
  { field: 'paymentAcc', headerName: 'Org Account Number', width: 400},
  {
    field: 'orgBalance',
    headerName: 'Running Sum Of Balance Owed',
    width: 400
  },
//   {
//   field: 'paymentStatus',
//   headerName: 'Payment Status',
//   width: 250
// },
  // {
  //   headerName: "Action",
  //   width: 500,
  //   renderCell: (params) => {
  //     return (
  //       <div>
  //         <Button
  //           variant="contained"
  //           size="small"
  //           tabIndex={params.hasFocus ? 0 : -1}
  //           onClick={(event) => {
  //             handleOpen(event, params);
  //           }}
  //         >
  //           Create Transaction
  //         </Button>
  //        </div>
       
  //     );
  //   },
  // },
];
React.useEffect(() => {
  fetch("http://localhost:8080/educator/findAllOrganisation")
    .then((res) => res.json())
    .then((result) => {
      setOrganisations(result);
    });
}, [refresh]);

    return(
        <div>

        <Grid container spacing={0}>
                      <Grid item xs={2}>
                          <TransactonSideBar/>
      
      
                          </Grid>
                      <Grid item xs={10}>
                      <h1>View All Organisation Balance</h1>
                      <div style={{ height: 400, width: '100%' }}>      
                      <DataGrid getRowId={(row)=>row.organisationId}
        rows={organisations}
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
      <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <CreateTransactionModal
            refresh={refreshPage}
              currOrg={currOrg}
              closeModalFunc={handleClose}
            ></CreateTransactionModal>
          </Modal>
      </div>
      
    )
}

export default OrgBalance;