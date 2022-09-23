import * as React from 'react';
import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InstantErrorMessage from './InstantErrorMessage';
import InstantSuccessMessage from './InstantSuccessMessage';

import {
    Dialog, DialogActions, DialogContent,
    DialogContentText, Divider, TextField
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function ControlledAccordions({ course, refresh }) {
    const [expanded, setExpanded] = React.useState(false);

    const toggleAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // notification
    const [message, setMessage] = useState('');
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    // approve dialog box
    const [approveDialogBox, setApproveDialogBox] = useState(false);

    const openApproveDialogBox = () => {
        setApproveDialogBox(true);
    };

    const closeApproveDialogBox = () => {
        setApproveDialogBox(false);
    };

    // approval checklist
    const [courseDetails, setCourseDetails] = useState(false);
    const [courseFiles, setCourseFiles] = useState(false);
    const [courseAssessment, setCourseAssessment] = useState(false);

    // reject dialog box
    const [rejectDialogBox, setRejectDialogBox] = useState(false);

    const openRejectDialogBox = () => {
        setRejectDialogBox(true);
    };

    const closeRejectDialogBox = () => {
        setRejectDialogBox(false);
    };

    // rejection reason
    const [rejectionReason, setRejectionReason] = useState('');



    // approve course 
    const approveCourse = () => {
        var url = "http://localhost:8080/course/courses/approveCourse/" + course.courseId;
        console.log('URL is ' + url);
        fetch(url)
            .then(() => {
                refresh();
                closeApproveDialogBox();
                setMessage("Successfully approve " + course.courseCode);
                setError(false);
                setSuccess(true);


            }
            ).catch((err) => {
                closeApproveDialogBox();
                setMessage("Could not approve " + course.courseCode);
                setError(true);
                setSuccess(false);
                console.log(err.message);
            });
    };

    //reject course
    const rejectCourse = () => {
        const response = { "courseId": course.courseId, "rejectionReason":  rejectionReason  };
        console.log(JSON.stringify(response));
        var url = "http://localhost:8080/course/courses/rejectCourse";
        console.log('URL is ' + url);
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response)
        }).then(() => {
                refresh();
                closeRejectDialogBox();
                setMessage("Successfully reject " + course.courseCode);
                setError(false);
                setSuccess(true);


            }
            ).catch((err) => {
                closeApproveDialogBox();
                setMessage("Could not reject " + course.courseCode);
                setError(true);
                setSuccess(false);
                console.log(err.message);
            });
    };

    return (
        <div>
            {message && isError && (
                <InstantErrorMessage message={message}></InstantErrorMessage>
            )}
            {message && isSuccess && (
                <InstantSuccessMessage message={message}></InstantSuccessMessage>
            )}
            <Accordion expanded={expanded === 'panel1'} onChange={toggleAccordion('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Course status
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{course.courseApprovalStatus}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>

                        {course.courseApprovalStatus === 'Pending Approval' &&
                            <div>
                                <Typography>This course requires your approval to be live.</Typography>
                                <br />
                                <Grid container spacing={14}>
                                    <Grid item xs={1}>
                                        <Button variant="contained" color="success" onClick={openApproveDialogBox}>
                                            Approve
                                        </Button>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Button variant="contained" color="error" onClick={openRejectDialogBox}>
                                            Reject
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        }
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Dialog open={approveDialogBox} onClose={closeApproveDialogBox} fullWidth="lg">
                <DialogContent>
                    <Typography variant="h6">Approve {course.courseCode}</Typography>
                    <Divider></Divider>
                    <br />
                    <DialogContentText>
                        Before you approve this course, please check this list to confirm that you have reviewed the entire course in a careful manner.
                        <br />
                        <FormGroup>
                            <FormControlLabel control={<Checkbox onChange={(e) => setCourseDetails(e.target.checked)} />} label="Course details" />
                            <FormControlLabel control={<Checkbox onChange={(e) => setCourseFiles(e.target.checked)} />} label="Course teaching files" />
                            <FormControlLabel control={<Checkbox onChange={(e) => setCourseAssessment(e.target.checked)} />} label="Course assessment" />
                        </FormGroup>
                    </DialogContentText>


                </DialogContent>
                <DialogActions>
                    <Button onClick={approveCourse} disabled={!courseDetails || !courseFiles || !courseAssessment}>Approve</Button>
                    <Button>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={rejectDialogBox} onClose={closeRejectDialogBox} fullWidth="lg">
                <DialogContent>
                    <Typography variant="h6">Reject {course.courseCode}</Typography>
                    <Divider></Divider>
                    <br />
                    <DialogContentText>
                        Why do you wish to reject this course? The input you give will be visible to the course creator.
                        <br />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="rejectionReasonField"
                            label="Rejection Reason"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setRejectionReason(e.target.value)} />
                    </DialogContentText>


                </DialogContent>
                <DialogActions>
                    <Button onClick = {rejectCourse} disabled={rejectionReason == ''}>Reject</Button>
                    <Button>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}