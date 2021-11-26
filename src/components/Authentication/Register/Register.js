import { React, useState } from 'react'
import axios from 'axios';
import './Register.css'
import { config } from '../../../global/config';
import { TextField, Button, Select, MenuItem, InputLabel } from '@mui/material'

const errMessages = {
    incomplete: "Please fill all the details",
}

const accountTypes = {
    STUDENT: "STUDNET",
    TEACHER: "TEACHER",
    ADMIN: "ADMIN"
}

const Register = ({ setToken }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [accountType, setAccountType] = useState("")
    const [errMessage, setErrMeassage] = useState("")

    const register = async () => {
        if (email === undefined || email === "") {
            setErrMeassage(errMessages.incomplete)
            return
        }
        if (password === undefined || password === "") {
            setErrMeassage(errMessages.incomplete)
            return
        }
        if (username === undefined || username === "") {
            setErrMeassage(errMessages.incomplete)
            return
        }
        // console.log(accountType)
        let result = await axios.post(config.BASE_URL + "auth/register", { email, password, username, accountType })
        if (result.data.status === "Successful") {
            setToken(result.data.data.token);
        }
        else {
            // console.log(result.data.data)
            setErrMeassage(result.data.message);
        }
    }

    return (
        <div className="loginContainer">
            <form className="loginForm">
                <TextField
                    label="Email"
                    variant="outlined"
                    className="loginInputBar"
                    margin="dense"
                    onChange={event => setEmail(event.target.value)}></TextField>
                <TextField
                    className="loginInputBar"
                    label="Type"
                    value={accountType}
                    select
                    margin="dense"
                    onChange={event => setAccountType(event.target.value)}>
                    <MenuItem value={accountTypes.STUDENT}>{accountTypes.STUDENT}</MenuItem>
                    <MenuItem value={accountTypes.TEACHER}>{accountTypes.TEACHER}</MenuItem>
                    <MenuItem value={accountTypes.ADMIN}>{accountTypes.ADMIN}</MenuItem>
                </TextField>
                <TextField
                    label="Username"
                    variant="outlined"
                    className="loginInputBar"
                    margin="dense"
                    onChange={event => setUsername(event.target.value)}></TextField>
                <TextField
                    label="Password"
                    variant="outlined"
                    className="loginInputBar"
                    margin="dense"
                    type="password"
                    onChange={event => setPassword(event.target.value)}></TextField>
                {errMessage != "" ?
                    <div className="loginFormError">{errMessage}</div> : null}
                <Button
                    variant="contained"
                    className="loginSubmit"
                    onClick={() => register()}>Register</Button>
            </form>
        </div>
    )
}

export default Register
