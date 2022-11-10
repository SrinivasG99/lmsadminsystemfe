import { Button, Chip, Divider, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import TransactonSideBar from "../components/TransactionSideBar";
import ViewLearnerDetailsDialog from "../components/ViewLearnerDetailsDialog";
import DelteTransactionDialog from "../components/DeleteTransactionDialog";

const LearnerTransaction = () => {
  const [transactions, setTransaction] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [learnerId, setLearnerId] = useState("")

  const handleOpen = (event, params) => {
    setLearnerId(params.row.learnerId)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const columns = [
    { field: 'learnerTransactionId', headerName: 'Learner Transaction ID', width: 300 },
    { field: 'timestamp', headerName: 'Timestamp', width: 300 },
    { field: 'amount', headerName: 'Amount', width: 300 },
    {
      field: 'transactionType',
      headerName: 'TransactionType',
      width: 300
    },
    {
      headerName: "Action",
      width: 500,
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="contained"
              size="small"
              tabIndex={params.hasFocus ? 0 : -1}
              onClick={(event) => {
                handleOpen(event, params);
              }}
            >
              View Learner Details
            </Button>
          </div>

        );
      },
    },
  ];
  React.useEffect(() => {
    fetch("http://localhost:8080/learnerTransaction/getAllLearnerTransaction")
      .then((res) => res.json())
      .then((result) => {
        setTransaction(result);
      });
  }, []);

  return (
    <div>

      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TransactonSideBar />


        </Grid>
        <Grid item xs={10}>
          <center>
            <Typography variant="h4">View All Learner Transaction</Typography>
          </center>
          <br />
          <div style={{ height: '60vh', width: '80vw' }}>
            <DataGrid getRowId={(row) => row.timestamp}
              rows={transactions}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}


            />
          </div>

          <br></br>
          <Divider>
            <Chip label="End" />
          </Divider>

          <br></br>
        </Grid>
      </Grid>
      <ViewLearnerDetailsDialog
        open={open}
        onClose={handleClose}
        learnerId={learnerId}
      ></ViewLearnerDetailsDialog>

    </div>
  )
}

export default LearnerTransaction;