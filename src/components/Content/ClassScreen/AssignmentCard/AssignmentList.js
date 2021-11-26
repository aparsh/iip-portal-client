import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { config } from '../../../../global/config'
import AssignmentCard from './AssignmentCard';
import Loading from '../../../Common/Loading/Loading'

const AssignmentList = ({ token, dueAssignmentsScreen, class_code, allAssignmentScreen }) => {
    if(allAssignmentScreen === null || allAssignmentScreen === undefined) allAssignmentScreen=false
    const [assignments, setAssignments] = useState()
    const [loading, setLoading] = useState(true)

    const getNotes = async () => {
        const reqConfig = {
            headers: { Authorization: `Bearer ${token}` }
        }
        let endpoint = "assignment/past/"
        if (dueAssignmentsScreen) {
            endpoint = "assignment/due/"
        }
        if(allAssignmentScreen){
            endpoint = "assignment/all/"
        }
        const resp = await axios.get(config.BASE_URL + endpoint + class_code, reqConfig)
        console.log("Assignmets", resp.data)
        if (resp.data.status === "Successful") {
            return resp.data.data.assignments
        }
    }

    useEffect(async () => {
        const newNotes = await getNotes()
        console.log(newNotes)
        setAssignments(newNotes)
        setLoading(false)
    }, [])

    const List = () => {
        return (
            <div>
                {assignments.length == 0 ? "Nothing to show..." :
                    assignments.map((assignment) => {
                        return <AssignmentCard
                            token={token}
                            assignment={assignment} 
                            submitButton={dueAssignmentsScreen}/>
                    })}
            </div>
        )
    }

    return (
        <div>
            {loading ? <div className="notesLoading"><Loading /></div> :
                <List />}
        </div>
    )
}

export default AssignmentList
