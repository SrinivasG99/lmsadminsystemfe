import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import {
    Button, Typography, TextField, Switch,
    ThemeProvider, Tooltip, createTheme, LinearProgress,
    Box, InputAdornment, Stack, Select, MenuItem, InputLabel
} from '@mui/material';
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

export default function CreateNewEnhancementItem() {
    const navigate = useNavigate();

    // all the fields
    const [pricePerUse, setPricePerUse] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [enhancementItemName, setEnhancementItemName] = useState("");
    const [enhancementItemDescription, setEnhancementItemDescription] = useState("");
    const [itemPointIncrement, setItemPointIncrement] = useState(0);
    const [itemType, setItemType] = useState("");

    // file uploading
    // image upload
    const [currentFile, setCurrentFile] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(
        "https://img.freepik.com/premium-vector/different-trees-big-set-fir-pine-spruce-larch-coniferous-deciduous-forest-hand-draw-colorful-trees-vector-cartoon-illustration-isolated-white-background_501069-1096.jpg?w=2000"
    );
    const [progress, setProgress] = useState(0);

    const selectFile = (event) => {
        setCurrentFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setProgress(0);
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

        if (pricePerUse === 0) {
            toast.warn("Price per use must be more than 0!");
            error = true;
        }
        if (imageUrl == "") {
            toast.warn("An image has to be uploaded!");
            error = true;
        }

        if (enhancementItemName === "") {
            toast.warn("Enhancement item name has to be filled!");
            error = true;
        }

        if (enhancementItemDescription === "") {
            toast.warn("Enhancement item description has to be filled!");
            error = true;
        }

        if (itemType === "") {
            toast.warn("Item type has to be specified!");
            error = true;
        }

        if (itemPointIncrement === 0) {
            toast.warn("Item point increment has to be more than 0");
            error = true;
        }



        if (error) {
            return;
        }

        const newItem = {
            pricePerUse: pricePerUse,
            imageUrl: imageUrl,
            enhancementItemName: enhancementItemName,
            enhancementItemDescription: enhancementItemDescription,
            itemPointIncrement: itemPointIncrement,
            itemType: itemType
        };
        console.log(JSON.stringify(newItem));
        fetch("http://localhost:8080/treePoints/createNewEnhancementItem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem)
        }).then(() => {
            toast.success("Enhancement item has been successfully created!");

            navigate('/listOfEnhancementItems');

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
                        <ToastContainer />
                        <RewardsDrawer></RewardsDrawer>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h4" style={{ paddingLeft: '6rem' }}>
                            Create New Enhancement Item
                        </Typography>
                        <br />
                        <div style={{ paddingLeft: "8em" }}>
                            <TextField
                                label="Enhancement item name"
                                variant="outlined"
                                fullWidth
                                style={{ paddingBottom: "10px" }}
                                value={enhancementItemName}
                                onChange={(e) => setEnhancementItemName(e.target.value)}

                            />

                            <TextField
                                label="Enhancement item description"
                                variant="outlined"
                                fullWidth
                                style={{ paddingBottom: "10px" }}
                                value={enhancementItemDescription}
                                onChange={(e) => setEnhancementItemDescription(e.target.value)}

                            />
                            <TextField
                                label="Price per use"
                                variant="outlined"
                                fullWidth
                                value={pricePerUse}
                                style={{ marginBottom: "5px" }}
                                onChange={(e) => setPricePerUse(e.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Tree Points</InputAdornment>,
                                }}

                            />
                            <TextField
                                label="Item point increment"
                                variant="outlined"
                                fullWidth
                                value={itemPointIncrement}
                                style={{ marginBottom: "5px", marginTop: "10px" }}
                                onChange={(e) => setItemPointIncrement(e.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Item Points</InputAdornment>,
                                }}

                            />
                            <br />
                            <br />
                            <InputLabel style={{ marginBottom: "5px" }}>Item type</InputLabel>
                            <Select
                                label="Item type"
                                id="demo-simple-select"
                                value={itemType}
                                fullWidth
                                onChange={(event) => setItemType(event.target.value)}
                            >
                                <MenuItem value={0}>Building</MenuItem>
                                <MenuItem value={1}>Plant</MenuItem>
                                <MenuItem value={2}>Others</MenuItem>
                            </Select>
                            <br />

                            <div id="small-image-upload">
                                {previewImage && (
                                    <div>
                                        <center>
                                            <img
                                                className="preview my20"
                                                src={previewImage}
                                                alt=""
                                                style={{ height: "200px", width: "200px", marginTop: "5px" }}
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



                            </div>

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