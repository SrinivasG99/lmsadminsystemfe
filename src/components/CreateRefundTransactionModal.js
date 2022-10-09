import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import axios from "axios";

import {
  Paper,
  Button,
} from "@mui/material";
import { useState } from "react";


export default function CreateRefundTransactionModal(props) {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [learnerId, setLearnerId] = useState("");
  const [learnerName, setLearnerName] = useState("")
  const [learnerAccNumber, setLearnerAccNumber] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [refundRequestId, setRefundRequstId] = useState("")

  const [amountPaidError, setAmountPaidError] = useState({ value: false, errorMessage: '' })

  React.useEffect(() => {
    setLearnerId(props.learnerId)
    setAmountPaid(props.amount)
    setRefundRequstId(props.refundRequestId)
    console.log(props.amount)
    fetch("http://localhost:8080/learner/getById?learnerId=" + learnerId)
      .then((res) => res.json())
      .then((result) => {
        const learner = result
        setLearnerAccNumber(learner.paymentAcc);
        setLearnerName(learner.name)
      });
  }, [learnerId, props.amount, props.learnerId]);
  const handleClick = async (e) => {
    e.preventDefault();


    setAmountPaidError({ value: false, errorMessage: '' })

    if (amountPaid === '') {
      setAmountPaidError({ value: true, errorMessage: 'You must enter an amount' })
    }
    
    else if (learnerId && learnerAccNumber && amountPaid && refundRequestId) {
      const transaction = { learnerId, learnerAccNumber, amountPaid, refundRequestId };
      console.log(transaction)
      try {
        const response = await axios.post(
          "http://localhost:8080/transaction/createRefundTransaction", transaction
        );
        // set the state of the user
        // store the user in localStorage
        console.log(response)
        const user = response.data
        console.log(user)
        props.closeModalFunc()
        props.refresh();


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
            <u>Add LMS Admin</u>
          </h1>
          <br></br>
          <TextField
            id="outlined-basic"
            label="Organisation Name"
            variant="outlined"
            required
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={learnerName}
            disabled
          />
          <TextField
            id="outlined-basic"
            label="Organisation Account Number"
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
            Create Transaction
          </Button>
          <br></br>
          <br></br>

          <Button variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
