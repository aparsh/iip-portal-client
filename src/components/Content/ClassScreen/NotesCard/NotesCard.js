import React from 'react'
import { Paper } from '@mui/material'
import './NotesCard.css'
import { config } from '../../../../global/config'
import download from 'downloadjs'
import { buffertoBlob } from '../../../../global/fileBlob'
import axios from 'axios'
import {getFormatedDate} from '../.../../../../../global/dateFormat'

const NotesCard = ({ notes, token }) => {

    const downloadNotes = async () => {
        const reqConfig = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const resp = await axios(config.BASE_URL + 'notes/download/' + notes._id, reqConfig)
        if (resp.data.status === 'Successful') {
            console.log(resp.data.data)
            const savFile = resp.data.data.file
            const blob = await buffertoBlob(savFile.buffer, savFile.contentType)
            download(blob, notes.name.trim() + '.pdf', "application/pdf");
        }
    }

    return (
        <div>
            <Paper
                className="notesCard"
                elevation={3}>
                <div className="notesContent">
                    {notes.name}
                    <div className="notesDate">
                        {getFormatedDate(notes.uploaded_on)}
                    </div>
                </div>
                <i class="fa fa-download notesDownloadButton"
                    onClick={async() => await downloadNotes()}></i>
            </Paper>
        </div>
    )
}

export default NotesCard
