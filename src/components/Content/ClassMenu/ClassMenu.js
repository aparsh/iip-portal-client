import { React, useState, useEffect } from 'react'
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import axios from "axios"
import ClassCard from './ClassCard'
import StudentScreen from '../ClassScreen/StudentScreen/StudentScreen'
import TeacherScreen from '../ClassScreen/TeacherScreen/TeacherScreen'
import './ClassMenu.css'
import { config, ClassView, getRequestHeaders } from '../../../global/config'
import Loading from '../../Common/Loading/Loading'

const ClassMenu = ({ token, screenView, setScreenView, userType }) => {
    const [loading, setLoading] = useState(true)
    const [selectedClass, setSelectedClass] = useState(() => {
        const saved = JSON.parse(localStorage.getItem("selectedClass"))
        console.log("saved Class", saved)
        return saved || ""
    })


    const [classes, setClasses] = useState(() => {
        const saved = localStorage.getItem('classes');
        const initialValue = JSON.parse(saved);
        // const initialValue = null
        return initialValue || [];
    })

    const getClasses = async () => {
        const reqConfig = getRequestHeaders(token)

        let response = await axios.get(config.BASE_URL + "classes/my", reqConfig);
        console.log(response.data)
        if (response.data.status === 'Successful') {
            return response.data.data.classes
        }
    }

    useEffect(async () => {
        console.log("here")
        let newClasses = await getClasses();
        localStorage.setItem("classes", JSON.stringify(newClasses))
        setClasses(newClasses)
        setLoading(false)
    }, [])

    useEffect(async () => {
        console.log("selectedClass", selectedClass)
        localStorage.setItem("selectedClass", JSON.stringify(selectedClass))
    }, [selectedClass])

    return (
        <div className="classScreen">
            {screenView === ClassView.CLASS_MENU ?
                <div className="classCardMenu">
                    {loading ? <Loading /> :
                        <ClassCard
                            setScreenView={setScreenView}
                            classes={classes}
                            setSelectedClass={setSelectedClass} />}
                </div> :
                <div className="userScreen" >
                    <div className="classScreen">
                        {userType === 'STUDENT' ?
                            <StudentScreen
                                userType={userType}
                                token={token}
                                selectedClass={selectedClass}
                                setSelectedClass={setSelectedClass} />
                            : null}
                    </div>
                    <div>
                        {userType === 'TEACHER' ?
                            <TeacherScreen
                                userType={userType}
                                token={token}
                                selectedClass={selectedClass}
                                setSelectedClass={setSelectedClass} />
                            : null}
                    </div>
                </div>
            }
        </div>
    )
}

export default ClassMenu
