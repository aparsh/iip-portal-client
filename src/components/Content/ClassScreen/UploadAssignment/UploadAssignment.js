import { React, useState, useEffect } from 'react'
import './UploadAssignment.css'
import { config, getRequestHeaders } from '../../../../global/config'
import Loading from '../../../Common/Loading/Loading'
import axios from 'axios'
import { TextField, Button } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const UploadAssignment = ({ token, class_code, setValue }) => {
    const [loading, setLoading] = useState(false)
    const [start_time, setStartTime] = useState(new Date());
    const [end_time, setEndTime] = useState(new Date());
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [marks, setMarks] = useState(0);
    const [file, setFile] = useState();
    const [endTimeError, setEndTimeError] = useState(false)
    const [startTimeError, setStartTimeError] = useState(false)
    const [marksError, setMarksError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)
    const [uploadError, setUploadError] = useState(false)

    const uploadAssignmentFile = async (file) => {
        console.log(file)
        setFile(file)
    }

    const checkDetails = async () => {
        if (name === null || name === undefined || name === "") {
            return true
        }
        if (marks === null || marks === undefined || marks === 0) {
            return true
        }
        if (start_time === null || start_time === undefined || end_time === null || end_time === undefined) {
            return true
        }
        if (file === null || file === undefined) {
            return true
        }
        return false
    }

    const uploadAssignment = async () => {
        setLoading(true)
        setDetailsError(false)
        if (checkDetails()) {
            setDetailsError(true)
        }
        const data = new FormData();
        data.append("file", file);
        data.append("start_time", start_time);
        data.append("end_time", end_time);
        data.append("class_code", class_code);
        data.append("name", name);
        data.append("marks", marks);
        if (description != null || description != undefined) {
            data.append("description", description);
        }
        const reqConfig = getRequestHeaders(token)
        const resp = await axios.post(config.BASE_URL + "assignment/upload", data, reqConfig)
        if (resp.data.status === 'Successful') {
            setValue(0)
            return
        }
        else {
            setUploadError(true)
            return;
        }

    }

    return (
        <div className="uploadFormContainer">
            {loading ? <div className="uploadFormLoading"><Loading /></div> :
                <form className="uploadForm">
                    <TextField
                        label="Name*"
                        variant="outlined"
                        className="uploadAssignmentInputBar"
                        margin="dense"
                        onChange={event => setName(event.target.value)}></TextField>
                    <div className="uploadAssignmentInputBar">
                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props}
                                    className="uploadAssignmentInputBar" />}
                                label="Start Time*"
                                value={start_time}
                                onChange={(newValue) => {
                                    if (newValue > new Date()) {
                                        setStartTimeError(false)
                                        setStartTime(newValue)
                                    }
                                    else {
                                        setStartTimeError(true)
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    {startTimeError ? <div className="uploadAssignmentFormError">start time should be in future.</div> : null}
                    <div className="uploadAssignmentInputBar">
                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField
                                    {...props}
                                    className="uploadAssignmentInputBar" />}
                                label="End Time*"
                                value={end_time}
                                onChange={(newValue) => {
                                    if (newValue > start_time) {
                                        setEndTimeError(false)
                                        setEndTime(newValue)
                                    }
                                    else {
                                        setEndTimeError(true)
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    {endTimeError ? <div className="uploadAssignmentFormError">End time should be after start time.</div> : null}
                    <TextField
                        type="number"
                        label="Marks*"
                        variant="outlined"
                        className="uploadAssignmentInputBar"
                        margin="dense"
                        onChange={event => {
                            if (event.target.value > 0) {
                                setMarksError(false)
                                setMarks(event.target.value)
                            }
                            else {
                                setMarksError(true)
                            }
                        }}
                    />
                    {marksError ? <div className="uploadAssignmentFormError">Marks should be more than 0.</div> : null}
                    <TextField
                        margin="normal"
                        className="uploadAssignmentInputBar"
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <div className="marginDiv" />
                    <input
                        type="file"
                        id="assignment-file"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={async (event) => { await uploadAssignmentFile(event.target.files[0]) }} />
                    <label htmlFor="assignment-file">
                        <i class="fa fa-upload notesDownloadButton" />
                        {/* <Button
                        className="uploadAssignmentButton"
                        variant="contained">
                        Upload File
                    </Button> */}
                    </label>
                    {detailsError ? <div className="uploadAssignmentFormError">Please fill all details.</div> : null}
                    {uploadError ? <div className="uploadNoteFormError">Something went wrong.</div> : null}
                    <div className="marginDiv" />
                    <Button
                        onClick={async () => await uploadAssignment()}
                        className="uploadAssignmentButton"
                        variant="contained">
                        Upload Assignment
                </Button>
                </form>
            }
        </div>
    )
}

export default UploadAssignment
