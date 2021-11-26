import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { config, getRequestHeaders } from '../../../global/config'
import { Typography, Button } from '@mui/material'
import Loading from '../../Common/Loading/Loading'
import './Profile.css'


const Profile = ({ token, setToken }) => {
    const [userDetails, setUserDetils] = useState()
    const [loading, setLoading] = useState(true)

    const getUserDetails = async () => {
        const reqConfig = getRequestHeaders(token);
        const resp = await axios.get(config.BASE_URL + 'user/details', reqConfig)
        if (resp.data.status === "Successful") {
            console.log(resp.data.data.user)
            return resp.data.data.user
        }
        return {}
    }

    useEffect(async () => {
        const user = await getUserDetails()
        setUserDetils(user)
        setLoading(false)
    }, [])

    const logout = () => {
        // localStorage.setItem("token", null)
        setToken("")
    }

    return (
        <div className="profileContainer">
            <i class="fa fa-user profileIcon" />
            {loading ?
                <Loading /> :
                <div className="profileContainer">
                    <Typography
                        variant="h3"
                        className="profileUsername">
                        {userDetails.username}
                    </Typography>
                    <Typography
                        variant="h5"
                        className="profileDetails">
                        {userDetails.email}
                    </Typography>
                    <Typography
                        variant="h5"
                        className="profileDetails">
                        {userDetails.type}
                    </Typography>
                    <Button
                        variant="contained"
                        margin="dense"
                        className="profileLogoutButton"
                        onClick={()=>logout()}>
                        Logout
                    </Button>
                </div>
            }
        </div>
    )
}

export default Profile
