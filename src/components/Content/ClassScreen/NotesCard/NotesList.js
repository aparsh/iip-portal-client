import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { config, getRequestHeaders } from '../../../../global/config'
import NotesCard from './NotesCard'
import Loading from '../../../Common/Loading/Loading'
import './NotesCard.css'

const NotesList = ({ token, class_code }) => {
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState()

    const getNotes = async () => {
        const reqConfig = getRequestHeaders(token)
        console.log(class_code)
        const resp = await axios.get(config.BASE_URL + "notes/by/class/" + class_code, reqConfig)
        console.log("Notes",resp.data)
        if (resp.data.status === "Successful") {
            return resp.data.data.notes
        }
    }

    useEffect(async () => {
        const newNotes = await getNotes()
        console.log(newNotes)
        setNotes(newNotes)
        setLoading(false)
    }, [])
    return (
        <div>
            {loading ? <div className="notesLoading"><Loading /></div> :
                notes.map((current_notes) => {
                    return (
                        <NotesCard notes={current_notes} token={token}/>
                    )
                })
            }
        </div>
    )
}

export default NotesList
