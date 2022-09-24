import { Button, Grid, Paper } from "@mui/material";
import axios from "axios";
import React from "react";

export default function ViewOrgAdminApprovalReq(props) {
  const approvalRequest = props.approvalReq;
  console.log(approvalRequest)
  const paperStyle = {
    padding: "10px 10px",
    width: 800,
    margin: "20px auto",
  };

  const handleDownload= async (event) => {
    event.preventDefault();
    console.log(approvalRequest.fileStorageName)
    try {
      const response = await axios.get(
          `http://localhost:8080/downloadFileFromName/${approvalRequest.fileStorageName}`, {
            responseType: 'arraybuffer'
        }
        );
        const file = new Blob([(response.data)], {type: "application/zip"})
        const element = document.createElement('a');
        element.href = window.URL.createObjectURL(file, {type: "application/zip"})
        element.download = "ReqAttachment-" + Date.now() + ".zip"


    // Append to html link element page
    document.body.appendChild(element);

    // Start download
    element.click();

    // Clean up and remove the link
    element.parentNode.removeChild(element);

  } catch (error) {
      // Handle error here
      console.log(error.message)
  }
  }



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
          <Button onClick={handleDownload} disabled={approvalRequest.fileStorageName.length === 0}>Download Content</Button>
        </div>
      </Paper>
    </div>
  );
} 
