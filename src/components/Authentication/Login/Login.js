import { React, useState } from 'react'
import axios from 'axios';
import './Login.css'
import { config } from '../../../global/config';
import { TextField, Button } from '@mui/material'


const errMessages = {
    noEmail: "please enter your email.",
    noPassword: "please enter your password.",
    wrongPassword: "password incorrect",
}

const Login = ({ setToken }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMessage, setErrMeassage] = useState("")

    const login = async () => {
        if (email === undefined || email === "") {
            setErrMeassage(errMessages.noEmail)
            return
        }
        if (password === undefined || password === "") {
            setErrMeassage(errMessages.noPassword)
            return
        }
        let result = await axios.post(config.BASE_URL + "auth/login", { email, password })
        if (result.data.status === "Successful") {
            setToken(result.data.data.token);
        }
        else {
            // console.log(result.data.data)
            setErrMeassage("wrong password or username");
        }
    }
    return (
        <div className="loginContainer">
            <form className="loginForm" onSubmit={event => login(event)}>
                <TextField
                    label="Email"
                    variant="outlined"
                    className="loginInputBar"
                    margin="dense"
                    onChange={event => setEmail(event.target.value)}></TextField>
                <TextField
                    label="Password"
                    variant="outlined"
                    className="loginInputBar"
                    type="password"
                    margin="dense"
                    onChange={event => setPassword(event.target.value)}></TextField>
                {errMessage != "" ?
                    <div className="loginFormError">{errMessage}</div> : null}
                <Button
                    variant="contained"
                    className="loginSubmit"
                    onClick={() => login()}>Login</Button>
            </form>
        </div>
    )
}

export default Login
