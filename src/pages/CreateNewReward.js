import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { Button, Typography, TextField, Switch, ThemeProvider, createTheme, LinearProgress, Box, InputAdornment, Stack } from '@mui/material';
import RewardsDrawer from '../components/RewardsDrawer';
import UploadFilesService from '../services/UploadFilesService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const theme = createTheme({
    components: {
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 15,
                    borderRadius: 5,
                },
                colorPrimary: {
                    backgroundColor: "#EEEEEE",
                },
                bar: {
                    borderRadius: 5,
                    backgroundColor: "#1a90ff",
                },
            },
        },
    },
});

export default function CreateNewReward() {
    const navigate = useNavigate();

    const [itemPrice, setItemPrice] = useState(0);
    const [smallAvailable, setSmallAvailable] = useState(false);
    const [mediumAvailable, setMediumAvailable] = useState(false);
    const [largeAvailable, setLargeAvailable] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // image upload
    const [currentFile, setCurrentFile] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(
        "https://img.freepik.com/premium-vector/different-trees-big-set-fir-pine-spruce-larch-coniferous-deciduous-forest-hand-draw-colorful-trees-vector-cartoon-illustration-isolated-white-background_501069-1096.jpg?w=2000"
    );
    const [progress, setProgress] = useState(0);

    // handle change
    function handleSmallChange() {
        setSmallAvailable(!smallAvailable);
    }

    function handleMediumChange() {
        setMediumAvailable(!mediumAvailable);
    }

    function handleLargeChange() {
        setLargeAvailable(!largeAvailable);
    }

    //notification message
    const [notifMessage, setNotifMessage] = useState("");

    // selecting file
    const selectFile = (event) => {
        setCurrentFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setProgress(0);
        setNotifMessage("");
    };

    const uploadImage = () => {



        setProgress(0);
        UploadFilesService.upload(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                toast.info("Successfully uploaded the image!");
                setImageUrl(response.data.fileURL);
            })
            .catch((err) => {
                toast.error("Could not upload the picture!");
                setProgress(0);
                setCurrentFile(undefined);
            })
            ;



    };

    const handleSubmitItem = () => {
        var error = false;

        if (itemPrice === 0) {
            toast.warn("Item price must be more than 0!");
            error = true;
        }
        if (imageUrl == "") {
            toast.warn("An image has to be uploaded!");
            error = true;
        }
        if (!smallAvailable && !mediumAvailable && !largeAvailable) {
            toast.warn("At least one item size has to be available.");
            error = true;
        }

        if (itemName === "") {
            toast.warn("Item name has to be filled!");
            error = true;
        }

        if (itemDescription === "") {
            toast.warn("Item description has to be filled!");
            error = true;
        }

        if (error) {
            return;
        }

        const newItem = {
            price: itemPrice,
            imageUrl: imageUrl,
            smallAvailable: smallAvailable,
            mediumAvailable: mediumAvailable,
            largeAvailable: largeAvailable,
            itemName: itemName,
            itemDescription: itemDescription
        };
        console.log(JSON.stringify(newItem));
        fetch("http://localhost:8080/treePoints/createNewItem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem)
        }).then(() => {
            toast.success("Item has been successfully created!");
            setImageUrl("");
            setItemPrice("");
            setImageUrl("");
            setSmallAvailable(false);
            setMediumAvailable(false);
            setLargeAvailable(false);
            setItemDescription("");
            setItemName("");

            navigate('/rewardsPage');

            

        }).catch((err) => {
            toast.error(JSON.stringify(err.message));

        });
    }




    return (
        <>
            <ToastContainer />
            <div>
                <Grid container>
                    <Grid item xs={1}>
                        <RewardsDrawer></RewardsDrawer>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h4" style={{ paddingLeft: '6rem' }}>
                            Create New Reward Item
                        </Typography>
                        <br />
                        <div style={{ paddingLeft: "8em" }}>
                            <TextField
                                label="Item name"
                                variant="outlined"
                                fullWidth
                                style={{ paddingBottom: "10px" }}
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}

                            />

                            <TextField
                                label="Item Description"
                                variant="outlined"
                                fullWidth
                                style={{ paddingBottom: "10px" }}
                                value={itemDescription}
                                onChange={(e) => setItemDescription(e.target.value)}

                            />

                            <TextField
                                label="Item Price"
                                variant="outlined"
                                fullWidth
                                style={{ paddingBottom: "10px" }}
                                value={itemPrice}
                                onChange={(e) => setItemPrice(e.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Tree Points</InputAdornment>,
                                }}

                            />
                            <Stack direction="row" spacing={8}>

                                <div>
                                    <br />
                                    <Typography style={{ color: "grey" }}>Available in small size</Typography>
                                    <Switch
                                        onChange={handleSmallChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name="Available in small size"
                                    />
                                </div>
                                <div>
                                    <br />
                                    <Typography style={{ color: "grey" }}>Available in medium size</Typography>
                                    <Switch
                                        onChange={handleMediumChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name="Available in medium size"
                                    />
                                </div>
                                <div>
                                    <br />
                                    <Typography style={{ color: "grey" }}>Available in large size</Typography>
                                    <Switch
                                        onChange={handleLargeChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name="Available in large size"
                                    />
                                </div>
                            </Stack>
                            <br />

                            {previewImage && (
                                <div>
                                    <center>
                                        <img
                                            className="preview my20"
                                            src={previewImage}
                                            alt=""
                                            style={{ height: "200px", width: "200px" }}
                                        />
                                    </center>

                                </div>
                            )}
                            {currentFile && (
                                <Box className="my20" display="flex" alignItems="center">
                                    <Box width="100%" mr={1}>
                                        <ThemeProvider theme={theme}>
                                            <LinearProgress variant="determinate" value={progress} />
                                        </ThemeProvider>
                                    </Box>
                                    <Box minWidth={35}>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >{`${progress}%`}</Typography>
                                    </Box>
                                </Box>
                            )}
                            <label htmlFor="btn-upload">
                                <input
                                    id="btn-upload"
                                    name="btn-upload"
                                    style={{ display: "none" }}
                                    type="file"
                                    accept="image/*"
                                    onChange={selectFile}
                                />
                                <Button className="btn-choose" variant="outlined" component="span">
                                    Choose Item Image
                                </Button>
                            </label>
                            <Button
                                className="btn-upload"
                                color="primary"
                                variant="contained"
                                component="span"
                                disabled={!currentFile}
                                onClick={uploadImage}
                            >
                                Upload
                            </Button>

                            <br />
                            <br />
                            <Button variant="contained" onClick={handleSubmitItem} fullWidth>Submit</Button>


                        </div>

                    </Grid>
                </Grid>

            </div>
        </>
    );
}