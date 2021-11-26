import { React, useState, useEffect } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import { config, getRequestHeaders } from '../../../global/config'
import './AddClass.css'
import axios from 'axios'

const AddClass = ({ token }) => {
    const [name, setName] = useState();
    const [class_code, setClassCode] = useState();
    const [description, setDescription] = useState("");
    const [nameError, setNameError] = useState(false)
    const [classCodeError, setClassCodeError] = useState(false)
    const [formError, setFormError] = useState(false)

    const checkDetails = () => {
        let check = false
        if (name == null || name == undefined || name === "") {
            setNameError(true)
            check = true
        }
        if (class_code == null || class_code == undefined || class_code === "") {
            setClassCodeError(true)
            check = true
        }
        return check
    }

    const addClass = async () => {
        setClassCodeError(false)
        setNameError(false)
        if (checkDetails()) return;
        const reqConfig = getRequestHeaders(token)
        const data = {
            name: name,
            class_code: class_code,
            description: description
        }
        const resp = await axios.post(config.BASE_URL + 'classes/create', data, reqConfig)
        if (resp.data.status === "Successful") {
            window.location.reload();
        }
        else {
            setFormError(true)
        }
    }

    return (
        <form className="addClassForm">
            <Typography variant="h5">Add new Class</Typography>
            <TextField
                label="Class Code*"
                variant="outlined"
                className="addClassInputBar"
                margin="dense"
                error={classCodeError}
                helperText={classCodeError ? "Please enter a class code" : ""}
                onChange={event => setClassCode(event.target.value)} />
            <TextField
                label="Name*"
                variant="outlined"
                className="addClassInputBar"
                margin="dense"
                error={nameError}
                helperText={nameError ? "Please enter a class name" : ""}
                onChange={event => setName(event.target.value)} />
            <TextField
                multiline
                rows={4}
                label="Description"
                variant="outlined"
                className="addClassInputBar"
                margin="dense"
                onChange={event => setDescription(event.target.value)} />
            {formError ? <div className="loginFormError"> Somthing went wrong</div> : null}
            <Button
                onClick={() => { addClass() }}
                variant="contained"
                className="addClassSubmit">Add Class</Button>
        </form>
    )
}

export default AddClass
