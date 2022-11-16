import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react'
import { Button, Typography, TableRow, TableCell, TableContainer, Paper, TableHead, TableBody, Table, List, ListItem, } from '@mui/material';
import CourseDrawer from '../components/CourseDrawer';
import RewardsDrawer from '../components/RewardsDrawer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RewardsPage() {
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
      })
  }, []);

  const renderEmptyRowMessage = () => {
    if (listOfItems.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={4} style={{ textAlign: "center" }}>
            There are currently no reward items!
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
            <RewardsDrawer></RewardsDrawer>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h4" style={{ paddingLeft: '6rem' }}>
              List of Rewards
            </Typography>
            <div style={{ paddingLeft: "5%", paddingTop: "2%", paddingRight: "1%" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Item Name</TableCell>
                      <TableCell>Item Description</TableCell>
                      <TableCell>Base Item Price</TableCell>
                      <TableCell>Size Available</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {renderEmptyRowMessage()}
                    {listOfItems.map((item) => (
                      <TableRow
                        key={item.itemId}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell>
                          <img src={item.imageUrl}
                            alt="Item image"
                            width="75px"
                            height="75px"
                            objectFit="contain"></img>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.itemName}
                        </TableCell>
                        <TableCell>{item.itemDescription.slice(0, 100) + "..."}</TableCell>
                        <TableCell>
                          <div>
                            {item.price}
                          </div>
                        </TableCell>
                        <TableCell>
                          <List>
                            {item.smallAvailable &&
                              <ListItem>
                                Small
                              </ListItem>
                            }
                            {item.mediumAvailable &&
                              <ListItem>
                                Medium
                              </ListItem>
                            }
                            {item.largeAvailable &&
                              <ListItem>
                                Large
                              </ListItem>
                            }

                          </List>
                        </TableCell>
                      </TableRow>
                    ))}
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