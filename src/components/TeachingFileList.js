import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import { Grid, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import TeachingFileComponent from './TeachingFileComponent';
import { useState } from 'react';
import InstantErrorMessage from './InstantErrorMessage';
import InstantSuccessMessage from './InstantSuccessMessage';
import { JavascriptOutlined } from '@mui/icons-material';




function TeachingFileList() {

    // list of folders
    const [folderList, setFolderList] = useState([]);

 



    var courseId = useParams();
    console.log("Course ID is " + JSON.stringify(courseId));
    courseId = courseId.courseId;

    React.useEffect(() => {
        fetch("http://localhost:8080/folder/getFoldersByCourseId/" + courseId)
            .then(res => res.json())
            .then((result) => {
                setFolderList(result);
            }
            ).catch((err) => {
                console.log(err.message);
            });
    }, []);

    const refresh = () => {
        fetch("http://localhost:8080/folder/getFoldersByCourseId/" + courseId)
            .then(res => res.json())
            .then((result) => {
                setFolderList(result);
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
                    <br />
                    <br />
                    <div>
                        {folderList.length > 0 &&
                            folderList
                                .map((folder) => (<TeachingFileComponent folder={folder} courseId={courseId} ></TeachingFileComponent>))
                        }
                        {folderList.length <= 0 &&
                            <p>This course currently doesn't have any teaching folder.</p>
                        }
                    </div>
                    



                </Grid>
            </Grid>




        </div>
    )


}

export default TeachingFileList;