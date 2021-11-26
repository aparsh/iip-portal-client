import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Typography } from '@mui/material'
import Loading from '../../Common/Loading/Loading'
import { config, getRequestHeaders } from '../../../global/config'
import './JoinClass.css'
import ClassElement from './ClassElement'

const JoinClass = ({ token }) => {
    const [loading, setLoading] = useState(true)
    const [classesToJoin, setClassesToJoin] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem("classesToJoin"))
            if (saved === null || saved === undefined)
                saved = []
            return saved;
        }
        catch (e) {
            console.log(e)
            return []
        }
    })

    useEffect(async () => {
        const classes = await getClassesToJoin()
        // classes = [...classes,...classes,...classes,...classes]
        localStorage.setItem("classesToJoin", JSON.stringify(classes))
        setClassesToJoin(classes)
        setLoading(false)
    },[])

    const getClassesToJoin = async () => {
        const reqConfig = getRequestHeaders(token)
        const resp = await axios.get(config.BASE_URL + 'classes/all', reqConfig)
        console.log("join classes", resp.data.data.classes)
        return resp.data.data.classes
    }
    const ClassToJoinList = () => {
        return (
            <div className='joinClassList'>
                {classesToJoin.map(current_class => {
                    return < ClassElement
                                token={token}
                                current_class={current_class} />
                })}
            </div>
        )
    }
    const ClassToJoinListContainer = () => {
        return (
            <div>
                {classesToJoin.length == 0 ?
                    <div>
                        No classes to show...
                    </div> :
                    <ClassToJoinList/>}
            </div>
        )
    }

    return (
        <div className="joinClassContainer">
            <Typography variant='h5'>
                Availaible Classes
            </Typography>
            {loading ?
                <Loading /> :
                <ClassToJoinListContainer />
            }
        </div>
    )
}

export default JoinClass
