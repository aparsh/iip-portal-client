import { React, useState, useEffect } from 'react'
import Login from './Login/Login'
import Register from './Register/Register'
import './Authentication.css'
import { Button } from "@mui/material"
import HomeImage from '../../images/HomeImage.png'

const screenSate = {
    AuthScreen: "AuthScreen",
    LoginScreen: "LoginScrren",
    RegisterScreen: "RegisterScreen",
}


const Authentication = ({ setToken }) => {
    // const [screen, setScreen] = useState(() => {
    //     // getting stored value
    //     const saved = localStorage.getItem("screenSate");
    //     const initialValue = JSON.parse(saved);
    //     return initialValue || screenSate.AuthScreen;
    // });

    const [screen, setScreen] = useState(screenSate.AuthScreen)

    useEffect(() => {
        localStorage.setItem("screenSate", JSON.stringify(screen));
    }, [screen])

    return (
        <div className="authScreen">
            <div className="authContainer">
                {screen != screenSate.AuthScreen ?
                    <div className="fa fa-arrow-left backToAuth"
                        onClick={() => setScreen(screenSate.AuthScreen)}
                    >
                    </div> : null}

                {screen === screenSate.AuthScreen ?
                    <div className="formContainer">
                        <div className="authButton">
                            <Button variant="contained" className="authButton"
                                onClick={() => setScreen(screenSate.LoginScreen)}>Login</Button></div>
                        <div className="authButton">
                            <Button variant="contained" className="authButton"
                                onClick={() => setScreen(screenSate.RegisterScreen)}>Register</Button></div>
                    </div> : null}

                {screen === screenSate.LoginScreen ?
                    <div className="formContainer">
                        <Login setToken={setToken} />
                    </div> : null}

                {screen === screenSate.RegisterScreen ?
                    <div className="formContainer">
                        <Register setToken={setToken} />
                    </div> : null}

            </div>
            <img src={HomeImage} width={'800px'}/>
        </div>
    )
}


export default Authentication
