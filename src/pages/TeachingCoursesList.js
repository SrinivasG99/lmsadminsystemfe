import * as React from 'react';
import Grid from '@mui/material/Grid';
import TeachingCoursesCards from '../components/TeachingCoursesCards';
import { Button, Typography} from '@mui/material';

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
            <Typography variant = "h4" style={{paddingLeft: '4rem'}}>
              List of courses
            </Typography>
          </Grid>
        </Grid>
        <TeachingCoursesCards></TeachingCoursesCards>
      </div>
    </>
  );
}