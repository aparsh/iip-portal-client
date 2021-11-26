import React from 'react'
import './SideBar.css'
import { Paper } from '@mui/material'
import { ClassView } from '../../../global/config'
const SideBar = ({ setScreenView, userType }) => {
    return (
        <div className="sideBar" >
            <i
                class="fa fa-university sideBarIcons"
                onClick={() => { console.log("clicked"); setScreenView(ClassView.CLASS_MENU) }}>
            </i>
            <i
                class="fa fa-graduation-cap sideBarIcons"
                onClick={() => { console.log("clicked"); setScreenView(ClassView.PROFILE) }}>
            </i>
            {userType === "TEACHER" ?
                <i
                    class="fa fa-plus-square sideBarIcons"
                    onClick={() => { console.log("clicked"); setScreenView(ClassView.ADD_CLASS_SCREEN) }}>
                </i> : null}
        </div >
    )
}

export default SideBar