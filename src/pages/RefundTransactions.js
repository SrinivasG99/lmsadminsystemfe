import { Button, Chip, Divider, Grid } from "@mui/material";
import { DataGrid, gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import React, { useState } from "react";
import DeleteRefundTransactionDialog from "../components/DeleteRefundTransactionDialog";
import DelteTransactionDialog from "../components/DeleteTransactionDialog";
import TransactonSideBar from "../components/TransactionSideBar";
import UpdateRefundTransactionDialog from "../components/UpdateRefundTransactionDialog";
import UpdateTransactionDialog from "../components/UpdateTransactionDialog";

const RefundTransactions = () => {
  const [transactions, setTransaction] = useState([]);
const [openUpdate, setOpenUpdate] = React.useState(false);
const [openDelete, setOpenDelete] = React.useState(false);

const [currTransaction, setCurrTrasaction] = useState({});
const [refresh, setRefresh] = useState(false)

const refreshPage = () => {
  setRefresh(!refresh)
}
const handleOpenUpdate = (event, params) => {
  setCurrTrasaction(params.row)
  setOpenUpdate(true)
}

const handleCloseUpdate = () => {
  setOpenUpdate(false)
}

const handleOpenDelete = (event, params) => {
  setCurrTrasaction(params.row)
  setOpenDelete(true)
}

const handleCloseDelete = () => {
  setOpenDelete(false)
}

const columns = [
  { field: 'refundTransactionId', headerName: 'Refund Transaction ID', width: 300},
  { field: 'paymentTime', headerName: 'Timestamp', width: 200},
  { field: 'learnerId', headerName: 'Learner ID', width: 200},
  {
    field: 'learnerAccNumber',
    headerName: 'Learner Account Number',
    width: 200
  },
  {
    field: 'amountPaid',
    headerName: 'Amount Paid',
    width: 200
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
              handleOpenUpdate(event, params);
            }}
          >
            Edit Transaction
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            size="small"
            tabIndex={params.hasFocus ? 0 : -1}
            onClick={(event) => {
              handleOpenDelete(event, params);
            }}
          >
            Delete Transaction
          </Button>
         </div>
       
      );
    },
  },
];
React.useEffect(() => {
  fetch("http://localhost:8080/transaction/getRefundTransaction")
    .then((res) => res.json())
    .then((result) => {
      setTransaction(result);
    });
}, [refresh]);

    return(
        <div>

        <Grid container spacing={0}>
                      <Grid item xs={2}>
                          <TransactonSideBar/>
      
      
                          </Grid>
                      <Grid item xs={10}>
                      <h1>View All Refund Transactions</h1>
                      <div style={{ height: 400, width: '100%' }}>
      <DataGrid getRowId={(row)=>row.paymentTime}
        rows={transactions}
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
      
      <UpdateRefundTransactionDialog
      open={openUpdate}
      closeModalFunc={handleCloseUpdate}
      transaction={currTransaction}
      refresh={refreshPage}>
      </UpdateRefundTransactionDialog>
      <DeleteRefundTransactionDialog
      isOpen={openDelete}
      closeDialog={handleCloseDelete}
      currTransaction={currTransaction}
      refresh={refreshPage}>
      </DeleteRefundTransactionDialog>      </div>
    )
}

export default RefundTransactions;