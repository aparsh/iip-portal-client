import React from 'react'
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material'
import axios from "axios"
import './ClassMenu.css'
import { ClassView } from '../../../global/config'

const ClassCard = ({ classes, setSelectedClass, setScreenView }) => {
    const selectClass = (current_class) => {
        console.log("selected")
        setSelectedClass(current_class)
    }

    const CurrentClassCard = ({ current_class }) => {
        return (
            <div className="classCardHolder">
                <Card sx={{ minWidth: 350 }} className="classCard" elevation={3}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {current_class.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {current_class.class_code}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {current_class.description === "" ? "No description present" : current_class.description}
                        </Typography>
                    </CardContent>
                    <CardActions className="classCardButton">
                        <Button
                            size="small"
                            onClick={() => {
                                selectClass(current_class)
                                setScreenView(ClassView.CLASS_SCREEN)
                            }}>
                            Open Class
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }

    return (
        <Grid container spacing={2}>
            {classes.map(current_class => {
                return (
                    <Grid item xs={4} key={current_class._id}>
                        <CurrentClassCard current_class={current_class} />
                    </Grid>
                )
            })}
        </Grid>
    )
}


export default ClassCard
