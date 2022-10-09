import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import axios from "axios";

import {
  Paper,
  Button,
  Dialog,
} from "@mui/material";
import { useState } from "react";


export default function UpdateRefundTransactionDialog(props) {


  const paperStyle = { padding: "50px 20px", width: 500, margin: "20px auto" };
  const [refundTransactionId, setRefundTransactionId] = useState("")
  const [learnerId, setLearnerId] = useState("");
  const [learnerAccNumber, setLearnerAccNumber] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  const [amountPaidError, setAmountPaidError] = useState({ value: false, errorMessage: '' })

  React.useEffect(() => {
    const currTransaction = props.transaction
    setRefundTransactionId(currTransaction.refundTransactionId)
    setLearnerId(currTransaction.learnerId)
    setLearnerAccNumber(currTransaction.learnerAccNumber)
    setAmountPaid(currTransaction.amountPaid)
  }, [props.transaction]);

  const handleClick = async (e) => {
    e.preventDefault();


    setAmountPaidError({ value: false, errorMessage: '' })

    if (amountPaid === '') {
      setAmountPaidError({ value: true, errorMessage: 'You must enter an amount' })
    }
    
    else if (refundTransactionId && learnerId && learnerAccNumber && amountPaid) {
      const transaction = { refundTransactionId, learnerId, learnerAccNumber, amountPaid };
      console.log(transaction)
      try {
        const response = await axios.post(
          "http://localhost:8080/transaction/updateRefundTransaction", transaction
        );
        // set the state of the user
        // store the user in localStorage
        console.log(response)
        const user = response.data
        console.log(user)
        props.refresh()
        props.closeModalFunc()


      } catch (error) {
        // Handle error here
        console.log(error.message)
      }
    }
  }


  const handleCancel = () => {
    props.closeModalFunc();
    console.log("child cancel called");
  };


  return (
    <Dialog open={props.open}>
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          //m: 1,
          // width: '25ch'
        },
      }}
      noValidate
      autoComplete="off"
    >
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1>
            <u>Edit Refund Transaction</u>
          </h1>
          <br></br>
          <TextField
            id="outlined-basic"
            label="Learner ID"
            variant="outlined"
            required
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={learnerId}
            disabled
          />
          <TextField
            id="outlined-basic"
            label="Learner Account Number"
            variant="outlined"
            required
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={learnerAccNumber}
            disabled
          />

          <TextField
            id="outlined-basic"
            label="Amount to pay"
            variant="outlined"
            required
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            error={amountPaidError.value}
            helperText={amountPaidError.errorMessage}
          />
          <br />
          <br />
          <br />
          <Button variant="contained" onClick={handleClick}>
            Edit Transaction
          </Button>
          <br></br>
          <br></br>

          <Button variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
        </Paper>
      </Container>
    </Box>
    </Dialog>
  );
}
