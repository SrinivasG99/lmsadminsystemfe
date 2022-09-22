import * as React from 'react';
import Grid from '@mui/material/Grid';
import TeachingCoursesCards from '../components/TeachingCoursesCards';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TeachingCoursesList() {
  // const [currPage, setCurrPage] = useState("course");
  // function handleChange(newCurrPage) {
  //   setCurrPage(newCurrPage);
  // }

  return (
    <>
      <div>
        <Grid container>
          <Grid item>
            <h1 style={{textAlign: 'left', padding: '0 4rem'}}>List of Courses</h1>
          </Grid>
          <Grid item alignItems="stretch" style={{ display: "flex" }}>
            <Link to ='/myTeachingCourse/new' style={{textDecoration: 'none'}}>
              <Button
                className="btn-upload"
                color="primary"
                variant="contained"
                component="span"
                //onClick={uploadImage}
                >
                Create New Course
              </Button>
            </Link>
          </Grid>
        </Grid>
        <TeachingCoursesCards></TeachingCoursesCards>
      </div>
    </>
  );
}