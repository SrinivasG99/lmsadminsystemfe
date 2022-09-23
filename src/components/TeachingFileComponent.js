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
import folderPicture from '../assets/folder.png';
import { Grid, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import '../css/TeachingFileList.css';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import InstantErrorMessage from './InstantErrorMessage';
import InstantSuccessMessage from './InstantSuccessMessage';







function TeachingFileComponent({ folder, courseId }) {

    return (

        <List>
            <ListItem>
                <ListItemButton href={`/myTeachingCourse/${courseId}/files/${folder.folderId}`}>
                
                    <ListItemIcon>
                        <img class="folder-picture" src={folderPicture} />
                    </ListItemIcon>
                    <ListItemText
                        primary={folder.folderName}
                    />


                </ListItemButton>

            </ListItem>
        </List>

    )
}

export default TeachingFileComponent;