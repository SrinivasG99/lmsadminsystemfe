import * as React from 'react';
import { useState } from 'react';
import { Container, Divider, Grid, TextField, Autocomplete, Paper, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
const paperStyle = {
    padding: '50px 20px',
    width: 1000,
    margin: "20px auto",
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1'
};

export default function CourseTags({ courseId }) {
    // current course tags
    const [listOfCourseTags, setListOfCourseTags] = useState([]);
    var url = "http://localhost:8080/categoryTag/getCourseCategoryTag/" + courseId;
    fetch(url)
        .then(res => res.json()).then((result) => {
            setListOfCourseTags(result);
        });


    return (

        <div>
            <Stack spacing={1} direction="row">
                {listOfCourseTags && listOfCourseTags.map((tag) => (<Chip label={tag.tagName} />))}
            </Stack>
        </div>
    );
}