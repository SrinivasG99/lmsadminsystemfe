import { Button, Dialog, Grid, Paper } from "@mui/material";
import React, { useState } from "react";

export default function ViewLearnerDetailsDialog(props) {
  const [learner, setLearner] = useState({})
//   const paperStyle = {
//     padding: "10px 10px",
//     width: 800,
//     margin: "20px auto",
//   };

  React.useEffect(() => {
    const learnerId = props.learnerId;
    console.log(learnerId)
    fetch("http://localhost:8080/learner/getById?learnerId=" + learnerId)
      .then((res) => res.json())
      .then((result) => {
        setLearner(result);
      });
  },[props.learnerId]);



  return (
    <div>
        <Dialog open={props.open} onClose={props.onClose}>
      <Paper elevation={3} >
        <Paper
          elevation={6}
          style={{ margin: "10px", padding: "15px", textAlign: "left" }}
        >
          <h1>View Learner Details</h1>
        </Paper>
        <Paper
          elevation={6}
          style={{ margin: "10px", padding: "15px", textAlign: "left" }}
        >
          Learner Name: {learner.name}
          <br />
          Learner Email: {learner.email}
          <br />
          Learner Username: {learner.username}
          <br />
          <br />
        </Paper>
        </Paper>
        <Button onClick={props.onClose}>
            Close
        </Button>

      </Dialog>
    </div>

  );
} 
