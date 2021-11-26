import { React, useState, useEffect } from 'react'
import './ClassScreen.css'
import axios from 'axios'
import { config, getRequestHeaders } from '../../../../global/config'
import { Tabs, Tab, Box, Typography } from '@mui/material'
import PropTypes from 'prop-types';
import NotesList from '../NotesCard/NotesList'
import AssignmentList from '../AssignmentCard/AssignmentList'

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

const StudentScreen = ({ selectedClass, setSelectedClass, token }) => {


    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="classScreenBody">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Assignments Due" {...a11yProps(0)} />
                        <Tab label="Assignments Completed" {...a11yProps(1)} />
                        <Tab label="Notes" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <AssignmentList
                        token={token}
                        dueAssignmentsScreen={true}
                        class_code={selectedClass.class_code} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AssignmentList
                        token={token}
                        dueAssignmentsScreen={false}
                        class_code={selectedClass.class_code} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <NotesList
                        token={token}
                        class_code={selectedClass.class_code} />
                </TabPanel>
            </Box>
        </div>
    );
}

export default StudentScreen
