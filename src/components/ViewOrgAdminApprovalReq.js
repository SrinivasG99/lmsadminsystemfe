import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ViewOrgAdminApprovalReq(props) {
  const [approvalRequest, setApprovalRequest] = React.useState("");
  const paperStyle = {
    padding: "10px 10px",
    width: 800,
    margin: "20px auto",
  };

  React.useEffect(() => {
    fetch(
      "http://localhost:8080/orgAdminApprovalReq/getPending?requestId=" +
        JSON.stringify(props.approvalReqIdProp)
    )
      .then((res) => res.json())
      .then((result) => {
        setApprovalRequest(result);
        console.log(result);
      });
  }, []);

  return (
    <div>
      <Paper elevation={3} style={paperStyle}>
        <Paper
          elevation={6}
          style={{ margin: "10px", padding: "15px", textAlign: "left" }}
        >
          <h1>View Organisation Admin Approval</h1>
        </Paper>
        <Paper
          elevation={6}
          style={{ margin: "10px", padding: "15px", textAlign: "left" }}
        >
          Admin Name: {approvalRequest.adminName}
          <br />
          Admin Email: {approvalRequest.adminEmail}
          <br />
          Admin Contact Number: {approvalRequest.adminNumber}
          <br />
          Admin Username: {approvalRequest.username}
          <br />
          Admin Password: {approvalRequest.password}
          <br />
          <br />
        </Paper>

        <Paper
          elevation={6}
          style={{ margin: "10px", padding: "15px", textAlign: "left" }}
        >
          Organisation Name: {approvalRequest.orgName}
          <br />
          Organisation Description: {approvalRequest.orgDescription}
          <br />
          Organisation Payment Account: {approvalRequest.paymentAcc}
          <br />
        </Paper>

              <div style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "space-around",
                  justifyContent: "space-between"}}>
          <Button onClick={props.closeModalFunc}>back</Button>
          <Button>Download Content</Button>
        </div>
      </Paper>
    </div>
  );
}
