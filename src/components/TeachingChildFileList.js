import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { useParams } from 'react-router-dom';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import {
    Grid, LinearProgress, ThemeProvider,
    createTheme, Typography, Button, TextField,
    Dialog, DialogActions, DialogContent,
    DialogContentText, Box
} from '@mui/material';
import TeachingFileComponent from './TeachingFileComponent';
import AttachmentComponent from './AttachmentComponent';
import { useState } from 'react';

import InstantErrorMessage from './InstantErrorMessage';
import InstantSuccessMessage from './InstantSuccessMessage';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import UploadService from "../services/UploadFilesService";


function TeachingChildFileList() {
    var courseId = useParams();
    courseId = courseId.courseId;

    var folderId = useParams();
    folderId = folderId.folderId;

    const [folderIdRefresh, setFolderIdRefresh] = useState(folderId);

    const [folderList, setFolderList] = useState([]);
    const [attachmentList, setAttachmentList] = useState([]);

    React.useEffect(() => {
        fetch("http://localhost:8080/folder/getFolderByFolderId/" + folderIdRefresh)
            .then(res => res.json())
            .then((result) => {
                var fol = result;
                setFolderList(fol.childFolders);
                setAttachmentList(fol.attachments);
            }
            ).catch((err) => {
                console.log(err.message);
            });
    }, []);

    const changeFolderIdWrapper = (num) => {
        fetch("http://localhost:8080/folder/getFolderByFolderId/" + num)
            .then(res => res.json())
            .then((result) => {
                var fol = result;
                setFolderList(fol.childFolders);
                setAttachmentList(fol.attachments);
            }
            ).catch((err) => {
                console.log(err.message);
            });
    };



    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h5">
                        Content Files
                    </Typography>
                    <divider></divider>
                    <br />
                    <div>
                        {folderList && folderList.length > 0 &&
                            folderList
                                .map((folder) => (<TeachingFileComponent folder={folder} courseId={courseId} changeFolderIdWrapper = {changeFolderIdWrapper}></TeachingFileComponent>))
                        }
                        {attachmentList && attachmentList.length > 0 &&
                            attachmentList
                                .map((attachment) => (<AttachmentComponent attachment={attachment} courseId={courseId}></AttachmentComponent>))
                        }
                        {(!folderList || folderList.length <= 0) && (!attachmentList || attachmentList.length <= 0) &&
                            <p>This folder doesn't have any content currently.</p>}
                    </div>


                </Grid>
            </Grid>




        </div>
    )
}

export default TeachingChildFileList;