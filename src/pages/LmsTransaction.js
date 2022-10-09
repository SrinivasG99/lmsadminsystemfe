import { Button, Chip, Divider, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { DataGrid, gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";
import DelteTransactionDialog from "../components/DeleteTransactionDialog";
import TransactonSideBar from "../components/TransactionSideBar";
import UpdateTransactionDialog from "../components/UpdateTransactionDialog";

const LmsTransaction = () => {
  const [transactions, setTransaction] = useState([]);
  const [reports,setReports] = useState([]);
  const [fileStorageName, setFileStorageName] = useState("")
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


const handleDownload= async (event) => {
  event.preventDefault();
  console.log(fileStorageName)
  try {
    const response = await axios.get(
        `http://localhost:8080/downloadFileFromName/${fileStorageName}`, {
          responseType: 'arraybuffer'
      }
      );
      const file = new Blob([(response.data)], {type: "application/pdf"})
      const element = document.createElement('a');
      element.href = window.URL.createObjectURL(file, {type: "application/pdf"})
      element.download = fileStorageName + ".pdf"


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

const columns = [
  { field: 'transactionId', headerName: 'LMS Transaction ID', width: 300},
  { field: 'paymentTime', headerName: 'Timestamp', width: 200},
  { field: 'orgName', headerName: 'Organisation Name', width: 200},
  {
    field: 'orgAccNumber',
    headerName: 'Org Account Number',
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
  fetch("http://localhost:8080/transaction/getAllLmsToOrgTransaction")
    .then((res) => res.json())
    .then((result) => {
      setTransaction(result);
    });
    fetch("http://localhost:8080/lmsRevenueReport/getAllReports")
    .then((res) => res.json())
    .then((result) => {
      setReports(result);
    });
}, [refresh]);

    return(
        <div>

        <Grid container spacing={0}>
                      <Grid item xs={2}>
                          <TransactonSideBar/>
      
      
                          </Grid>
                      <Grid item xs={10}>
                      <h1>View All LMS Transactions</h1>
                      <div style={{ height: 400, width: '100%' }}>
      <DataGrid getRowId={(row)=>row.paymentTime}
        rows={transactions}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}

      
      />
    </div>
    <h1>Download LMS revenue reports
    </h1>
    <FormControl fullWidth>
  <InputLabel id="month-year-select-label">---Select month and year for report---</InputLabel>
  <Select
    labelId="month-year-select-label"
    id="month-year-select"
    label="Select month and year of report"
    onChange={(e)=>setFileStorageName(e.target.value)}
  >
    {reports.map((item)=> (
      <MenuItem key={item.monthYear} value={item.fileStorageName}>
        {item.monthYear}
      </MenuItem>
    ))}
  </Select>
  <Button  onClick={handleDownload}>
    Download Report
  </Button>
</FormControl>

        <br></br>
        <Divider>
          <Chip label="End" />
        </Divider>
      
        <br></br>
        </Grid>
      </Grid>
      
      <UpdateTransactionDialog
      open={openUpdate}
      closeModalFunc={handleCloseUpdate}
      transaction={currTransaction}
      refresh={refreshPage}>
      </UpdateTransactionDialog>
      <DelteTransactionDialog
      isOpen={openDelete}
      closeDialog={handleCloseDelete}
      currTransaction={currTransaction}
      refresh={refreshPage}>
      </DelteTransactionDialog>      </div>
    )
}

export default LmsTransaction;