import * as React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import folderPicture from '../assets/file.png';
import { Grid, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import '../css/TeachingFileList.css';
import { Link, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import InstantErrorMessage from './InstantErrorMessage';
import InstantSuccessMessage from './InstantSuccessMessage';
import DownloadIcon from '@mui/icons-material/Download';






function AttachmentComponent({ attachment }) {

    var folderId = useParams();
    folderId = folderId.folderId;

    // download file
    const downloadFile = () => {
        var fileUrl = "";
        window.open(attachment.fileURL, '_blank');
    };

    
    return (

        <List>
            <ListItem>
                <ListItemButton onClick = {downloadFile}>
                    <ListItemIcon>
                        <img class="folder-picture" src={folderPicture} />
                    </ListItemIcon>
                    <ListItemText
                        primary={attachment.fileOriginalName}
                    />
                </ListItemButton>
            </ListItem>
        </List>

    )
}

export default AttachmentComponent;