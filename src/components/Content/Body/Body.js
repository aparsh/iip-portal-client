import { React, useState, useEffect } from 'react'
import './Body.css';
import axios from 'axios'
import { config, ClassView, getRequestHeaders } from '../../../global/config'
import ClassMenu from '../ClassMenu/ClassMenu'
import Profile from '../Profile/Profile'
import SideBar from '../SideBar/SideBar'
import JoinClass from '../JoinClass/JoinClass'
import AddClass from '../AddClass/AddClass'

const Body = ({ token, setToken }) => {
    const [userType, setUserType] = useState()
    const [screenView, setScreenView] = useState(() => {
        let storedValue = localStorage.getItem("screenView")
        storedValue = JSON.parse(storedValue)
        console.log("retrieved", storedValue)

        if (storedValue === null || storedValue === undefined)
            storedValue = ClassView.CLASS_MENU

        return storedValue
    })

    useEffect(() => {
        localStorage.setItem("screenView", JSON.stringify(screenView))
        console.log("changed", screenView)
    }, [screenView])

    const getUserType = async () => {
        const reqConfig = getRequestHeaders(token);
        const resp = await axios.get(config.BASE_URL + 'user/details', reqConfig)
        if (resp.data.status === "Successful") {
            return resp.data.data.user.type
        }
        return {}
    }

    useEffect(async () => {
        const type = await getUserType()
        console.log("userType", type)
        setUserType(type)
    }, [])

    const MainScreen = () => {
        switch (screenView) {
            case ClassView.PROFILE:
                return <Profile token={token} setToken={setToken} />
            case ClassView.ADD_CLASS_SCREEN:
                return <AddClass token={token} />
            default:
                return <ClassMenu
                    userType={userType}
                    token={token}
                    screenView={screenView}
                    setScreenView={setScreenView} />
        }
    }

    return (
        <div className="bodyContainer">
            <SideBar
                setScreenView={setScreenView}
                userType={userType} />
            <MainScreen />
            <JoinClass token={token} />
        </div>
    )
}

export default Body
