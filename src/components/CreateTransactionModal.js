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


export default function CreateTransactionModal(props) {
const currOrg = props.currOrg
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [payTo, setPayTo] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgAccNumber, setOrgAccNumber] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

 
  React.useEffect(() => {
    setPayTo(currOrg.organisationId);
    setOrgName(currOrg.organisationName);
    setOrgAccNumber(currOrg.paymentAcc);
    setAmountPaid(currOrg.orgBalance)
  },[currOrg.orgBalance, currOrg.organisationId, currOrg.organisationName, currOrg.paymentAcc, props.learnerId]);

  const [amountPaidError, setAmountPaidError] = useState({ value: false, errorMessage: '' })

  const handleClick = async (e) => {
    e.preventDefault();


    setAmountPaidError({ value: false, errorMessage: '' })

    if (amountPaid === '') {
      setAmountPaidError({ value: true, errorMessage: 'You must enter an amount' })
    }

    if (amountPaid === '0') {
      setAmountPaidError({ value: true, errorMessage: 'You must enter an amount greater than 0' })
    }

    if (amountPaid > currOrg.orgBalance) {
      setAmountPaidError({ value: true, errorMessage: 'You must enter an amount less than or equal to the org balance owed' })
    }
    
    else if (payTo && orgName && orgAccNumber && amountPaid && !(amountPaid === '0') && !(amountPaid > currOrg.orgBalance)) {
      const transaction = { payTo, orgName, orgAccNumber, amountPaid };
      try {
        const response = await axios.post(
          "http://localhost:8080/transaction/createLmsToOrgTransaction", transaction
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
