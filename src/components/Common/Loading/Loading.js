import React from 'react'
import { CircularProgress } from '@mui/material'
import './Loading.css'
const Loading = () => {
    return (
        <div classname="loadingContainer">
            <CircularProgress />
        </div>
    )
}

export default Loading
