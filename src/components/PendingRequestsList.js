import * as React from "react";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  Table,
  List,
  ListItem,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TechnicalSupportRequestsDrawer from "./TechnicalSupportRequestsDrawer";

export default function PendingRequestsList() {
  // const [currPage, setCurrPage] = useState("course");
  // function handleChange(newCurrPage) {
  //   setCurrPage(newCurrPage);
  // }

  const [listOfItems, setListOfItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/treePoints/getAllItems")
      .then((res) => res.json())
      .then((result) => {
        setListOfItems(result);
      });
  }, []);

  const renderEmptyRowMessage = () => {
    if (listOfItems.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={4} style={{ textAlign: "center" }}>
            There are currently no pending requests!
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div>
        <Grid container>
          <Grid item xs={1}>
            <TechnicalSupportRequestsDrawer></TechnicalSupportRequestsDrawer>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h4" style={{ paddingLeft: "6rem" }}>
              List of Pending Requests
            </Typography>
            <div
              style={{
                paddingLeft: "5%",
                paddingTop: "2%",
                paddingRight: "1%",
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Request Title</TableCell>
                      <TableCell>Request Description</TableCell>
                      <TableCell>Submitted by</TableCell>
                      <TableCell>Submitted on</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {renderEmptyRowMessage()}
                    {/* {listOfItems.map((item) => (
                      <TableRow
                        key={item.itemId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {item.itemName}
                        </TableCell>
                        <TableCell>
                          {item.itemDescription.slice(0, 100) + "..."}
                        </TableCell>
                        <TableCell>
                          <div>{item.price}</div>
                        </TableCell>
                        <TableCell>
                          <List>
                            {item.smallAvailable && <ListItem>Small</ListItem>}
                            {item.mediumAvailable && (
                              <ListItem>Medium</ListItem>
                            )}
                            {item.largeAvailable && <ListItem>Large</ListItem>}
                          </List>
                        </TableCell>
                      </TableRow>
                    ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
