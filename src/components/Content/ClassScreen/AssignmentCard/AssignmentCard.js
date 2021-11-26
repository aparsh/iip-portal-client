import { React, useState } from 'react'
import { Paper } from '@mui/material'
import './AssignmentCard.css'
import { config } from '../../../../global/config'
import download from 'downloadjs'
import { buffertoBlob } from '../../../../global/fileBlob'
import axios from 'axios'
import { getFormatedDate } from '../.../../../../../global/dateFormat'

const AssignmentCard = ({ assignment, token, submitButton }) => {
    // const [file, setfile] = useState()

    const reqConfig = {
        headers: { Authorization: `Bearer ${token}` }
    }

    const uploadSubmission = async (file) => {
        const data = new FormData();
        data.append("file", file);
        console.log(file)
        console.log(config.BASE_URL + "submission/submit/")
        const resp = await axios.post(config.BASE_URL + "submission/submit/" + assignment._id, data, reqConfig)
        console.log(resp)
    };

    const downloadAssignment = async () => {
        const resp = await axios.get(config.BASE_URL + 'assignment/download/' + assignment._id, reqConfig)
        if (resp.data.status === 'Successful') {
            console.log(resp.data.data)
            const savFile = resp.data.data.file
            const blob = await buffertoBlob(savFile.buffer, savFile.contentType)
            download(blob, assignment.name.trim() + '.pdf', "application/pdf");
            return
        }
        return
    }

    return (
        <div>
            <Paper
                className="assignmentCard"
                elevation={3}>
                <div className="notesContent">
                    {assignment.name}
                       <div className="notesDate">
                        start : {getFormatedDate(assignment.start_time)}
                    </div>
                    <div className="notesDate">
                        end : {getFormatedDate(assignment.end_time)}
                    </div>
                </div>
                <div>
                    <input
                        type="file"
                        id="submission-input"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={async (event) => { await uploadSubmission(event.target.files[0]) }} />
                    <label htmlFor="submission-input">
                        {submitButton ? <i class="fa fa-upload notesDownloadButton" /> : null}
                    </label>
                    <i class="fa fa-download notesDownloadButton"
                        onClick={async () => { await downloadAssignment() }}></i>
                </div>
            </Paper>
        </div>
    )
}

export default AssignmentCard
