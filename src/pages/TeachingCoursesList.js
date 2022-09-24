import * as React from 'react';
import Grid from '@mui/material/Grid';
import TeachingCoursesCards from '../components/TeachingCoursesCards';
import { Button, Typography} from '@mui/material';
import CourseDrawer from '../components/CourseDrawer';

export default function TeachingCoursesList() {
  // const [currPage, setCurrPage] = useState("course");
  // function handleChange(newCurrPage) {
  //   setCurrPage(newCurrPage);
  // }

  return (
    <>
      <div>
        <Grid container>
          <Grid item xs = {1}>
            <CourseDrawer></CourseDrawer>
          </Grid>
          <Grid item xs = {10}>
            <Typography variant = "h4" style={{paddingLeft: '6rem'}}>
              List of courses
            </Typography>
            <TeachingCoursesCards></TeachingCoursesCards>
          </Grid>
        </Grid>
        
      </div>
    </>
  );
}