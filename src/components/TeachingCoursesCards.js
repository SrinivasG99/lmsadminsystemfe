import React, { useState, useEffect } from 'react'
import '../App.css';
import CardItem from './CardItem';
import '../css/CardItem.css'

import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import cloudComputing from '../assets/cloud-computing.png';


function TeachingCoursesCards() {

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  // filtering
  const [pendingCourses, setPendingCourses] = useState([]);
  const [liveCourses, setLiveCourses] = useState([]);

  const filterPendingCourses = (courses) => {
    return courses.filter(course => course.courseApprovalStatus === "Pending Approval")
  };

  const filterLiveCourses = (courses) => {
    return courses.filter(course => course.courseApprovalStatus === "Live")
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/course/courses").
      then(res => res.json()).
      then((result) => {
        console.log(JSON.stringify(result));
        setPendingCourses(filterPendingCourses(result));
        setLiveCourses(filterLiveCourses(result));
      }
      )
  }, []);


  return (
    <>
      <div className='cards'>
        <div className='cards-container'>
          <Box sx={{ width: '100%' }}>
            <div style={{ paddingLeft: '3%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Pending approval" {...a11yProps(0)} />
                  <Tab label="Live" {...a11yProps(1)} />
                </Tabs>
              </Box>
            </div>
            <TabPanel value={value} index={0}>
              {(!pendingCourses || pendingCourses.length <= 0) &&
                <Typography style={{ paddingLeft: '2.5rem' }}>
                  Currently, there is no courses that are pending for your approval.
                </Typography>}
              <div className='cards-wrapper'>
                <ul className='cards-items'>
                  {pendingCourses.map(course => (
                    <CardItem src={cloudComputing}
                      text={course.courseTitle}
                      label={course.courseCode}
                      courseId={course.courseId}
                    />
                  ))
                  }
                </ul>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {(!liveCourses || liveCourses.length <= 0) &&
                <Typography style={{ paddingLeft: '2.5rem' }}>
                  Currently, there is no live courses available.
                </Typography>}
              <div className='cards-wrapper'>
                <ul className='cards-items'>
                  {liveCourses.map(course => (
                    <CardItem src={cloudComputing}
                      text={course.courseTitle}
                      label={course.courseCode}
                      courseId={course.courseId}
                    />
                  ))
                  }
                </ul>
              </div>

            </TabPanel>

          </Box>
        </div>
      </div>
    </>
  )
}

export default TeachingCoursesCards;