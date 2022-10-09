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


export default function UpdateTransactionDialog(props) {


  const paperStyle = { padding: "50px 20px", width: 500, margin: "20px auto" };
  const [transactionId, setTransactionId] = useState("")
  const [payTo, setPayTo] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgAccNumber, setOrgAccNumber] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  const [amountPaidError, setAmountPaidError] = useState({ value: false, errorMessage: '' })

  React.useEffect(() => {
    const currTransaction = props.transaction
    setTransactionId(currTransaction.transactionId)
    setPayTo(currTransaction.payTo)
    setOrgName(currTransaction.orgName)
    setOrgAccNumber(currTransaction.orgAccNumber)
    setAmountPaid(currTransaction.amountPaid)
  }, [props.transaction]);

  const handleClick = async (e) => {
    e.preventDefault();


    setAmountPaidError({ value: false, errorMessage: '' })

    if (amountPaid === '') {
      setAmountPaidError({ value: true, errorMessage: 'You must enter an amount' })
    }
    
    else if (payTo && orgName && orgAccNumber && amountPaid) {
      const transaction = { transactionId, payTo, orgName, orgAccNumber, amountPaid };
      console.log(transaction)
      try {
        const response = await axios.post(
          "http://localhost:8080/transaction/updateTransaction", transaction
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
            <u>Edit Transaction</u>
          </h1>
          <br></br>
          <TextField
            id="outlined-basic"
            label="Organisation Name"
            variant="outlined"
            required
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={orgName}
            disabled
          />
          <TextField
            id="outlined-basic"
            label="Organisation Account Number"
            variant="outlined"
            required
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={orgAccNumber}
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
