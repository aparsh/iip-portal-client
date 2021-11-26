import { React, useState, useEffect } from 'react'
import './UploadNotes.css'
import { config, getRequestHeaders } from '../../../../global/config'
import Loading from '../../../Common/Loading/Loading'
import axios from 'axios'
import { TextField, Button } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const UploadNotes = ({ token, class_code, setValue }) => {
    const [loading, setLoading] = useState(false)
    const [start_time, setStartTime] = useState(new Date());
    const [end_time, setEndTime] = useState(new Date());
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [file, setFile] = useState();
    const [detailsError, setDetailsError] = useState(false)
    const [uploadError, setUploadError] = useState(false)

    const uploadNoteFile = async (file) => {
        console.log(file)
        setFile(file)
    }



    const uploadNote = async () => {
        setUploadError(false)
        setLoading(true)
        const data = new FormData();
        data.append("file", file);
        data.append("class_code", class_code);
        data.append("name", name);
        if (description != null || description != undefined) {
            data.append("description", description);
        }
        const reqConfig = getRequestHeaders(token)
        const resp = await axios.post(config.BASE_URL + "notes/upload", data, reqConfig)
        if (resp.data.status === 'Successful') {
            setValue(1)
        }
        else {
            setUploadError(true)
        }

    }

    return (
        <div className="uploadFormContainer">
            {loading ?
                <div
                    className="uploadFormLoading">
                    <Loading />
                </div> :
                <form className="uploadForm">
                    <TextField
                        label="Name*"
                        variant="outlined"
                        className="uploadNoteInputBar"
                        margin="dense"
                        onChange={event => setName(event.target.value)}></TextField>
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
                        id="note-file"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={async (event) => { await uploadNoteFile(event.target.files[0]) }} />
                    <label htmlFor="note-file">
                        <i class="fa fa-upload notesDownloadButton" />
                        {/* <Button
                        className="uploadNoteButton"
                        variant="contained">
                        Upload File
                    </Button> */}
                    </label>
                    {detailsError ? <div className="uploadNoteFormError">Please fill all details.</div> : null}
                    {uploadError ? <div className="uploadNoteFormError">Something went wrong.</div> : null}
                    <div className="marginDiv" />
                    <Button
                        onClick={async () => await uploadNote()}
                        className="uploadNoteButton"
                        variant="contained">
                        Upload Notes
                </Button>
                </form>
            }
        </div>
    )
}

export default UploadNotes
