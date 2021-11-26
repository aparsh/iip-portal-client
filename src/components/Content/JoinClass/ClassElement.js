import { React, useState } from 'react'
import axios from 'axios'
import { Typography, Paper, Button } from '@mui/material'
import Loading from '../../Common/Loading/Loading'
import { config, getRequestHeaders } from '../../../global/config'
import './JoinClass.css'

const ClassElement = ({ token, current_class }) => {
    // const [loading, setLoading] = useState(false)
    const [joined, setJoined] = useState(current_class.joined)
    const joinClass = async () => {
        const reqConfig = getRequestHeaders(token)
        const resp = await axios.get(config.BASE_URL + 'classes/join/' + current_class.class_code, reqConfig)
        console.log(resp)
        if (resp.data.status === "Successful") {
            console.log("joined class")
            window.location.reload();
        }
    }

    return (
        <Paper elivation={1} className="joinClassCard" >
            <Typography variant="body1">{current_class.name}</Typography>
            <Typography variant="h5">{current_class.class_code}</Typography>
            {joined ?
                <Typography
                    variant="body1"
                    className="joinedClassText">
                    Joined
                </Typography> :
                <Button
                    variant="contained"
                    className="joinClassButton"
                    onClick={() => joinClass()}>
                    Join
                </Button>
            }
        </Paper>
    )
}

export default ClassElement
