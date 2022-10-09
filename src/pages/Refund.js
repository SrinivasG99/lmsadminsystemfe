import { CompareSharp } from "@mui/icons-material";
import { Button, Chip, Divider, Grid, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import CreateRefundTransactionModal from "../components/CreateRefundTransactionModal";
import TransactonSideBar from "../components/TransactionSideBar";
import ViewLearnerDetailsDialog from "../components/ViewLearnerDetailsDialog";

const Refund = () => {
  const [refundReqs, setRefundReqs] = useState([]);
const [open, setOpen] = React.useState(false);
const [learnerId, setLearnerId] = useState("")
const [amount, setAmount] = useState("")
const [refundReqId, setRefundReqId] = useState("");
const [openModal, setOpenModal] = useState(false)
const [refresh, setRefesh] = useState(false)

const refreshPage = () => {
  setRefesh(!refresh)
}

const handleOpen = (event, params) => {
  setLearnerId(params.row.learnerId)
  setOpen(true)
}

const handleClose = () => {
  setOpen(false)
}

const handleModalOpen = (event, params) => {
  setLearnerId(params.row.learnerId)
  setAmount(params.row.amount)
  setRefundReqId(params.row.refundRequestId)
  console.log(params.row.amount)
  setOpenModal(true)
}

const handleModalClose = () => {
  setOpenModal(false)
}

const columns = [
  { field: 'refundRequestId', headerName: 'Refund Request ID', width: 200},
  { field: 'learnerId', headerName: 'Learner ID', width: 200},
  { field: 'timeStamp', headerName: 'Request Time', width: 200},
  { field: 'amount', headerName: 'Amount', width: 100},
  {
    field: 'dueTime',
    headerName: 'Fulfilment Due Time',
    width: 200
  },
  { field: 'refundStatusEnum', headerName: 'Fulfillment Status', width: 200},
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
          &nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            size="small"
            tabIndex={params.hasFocus ? 0 : -1}
            onClick={(event) => {
              handleModalOpen(event, params);
            }}
          >
            Create Refund Transaction
          </Button>
         </div>
       
      );
    },
  },
];
React.useEffect(() => {
  fetch("http://localhost:8080/transaction/getRefundRequest")
    .then((res) => res.json())
    .then((result) => {
      setRefundReqs(result);
    });
}, [refresh]);

    return(
        <div>

        <Grid container spacing={0}>
                      <Grid item xs={2}>
                          <TransactonSideBar/>
      
      
                          </Grid>
                      <Grid item xs={10}>
                      <h1>View All Refund Requests</h1>
                      <div style={{ height: 400, width: '100%' }}>
      <DataGrid getRowId={(row)=>row.timeStamp}
        rows={refundReqs}
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
      <ViewLearnerDetailsDialog 
      open={open}
      onClose={handleClose}
      learnerId={learnerId} 
      ></ViewLearnerDetailsDialog>
      <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <CreateRefundTransactionModal
              learnerId={learnerId}
              closeModalFunc={handleModalClose}
              amount={amount}
              refundRequestId={refundReqId}
              refresh={refreshPage}
            ></CreateRefundTransactionModal>
          </Modal>
      </div>
    )
}

export default Refund;