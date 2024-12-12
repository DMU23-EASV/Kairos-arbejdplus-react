import React, { useContext, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { ETaskStatus } from "../Enum/ETaskStatus"; 
import { TaskModel } from "../Models/TaskModel";
 
//Draft
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
//Approved
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
//AwaitingApproval
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
//Rejected
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';

const TaskCardComp = ({ task, marginTop = '0px', marginBottom = '0px', specialTask = null }) => {

    const iconProps = { height: 35, width: 35 };
    const imageProps = { width: 95, height: 95 };

    const { 
        modelStatus,  
        startKilometers, 
        endKilometers,
        startTime,
        endTime,
        selectedDate} = task;

    const currentTask = specialTask || task;

    const TitleTranslator = {
        [ETaskStatus.Draft]: "Udkast",
        [ETaskStatus.AwaitingApproval]: "Afventer",
        [ETaskStatus.Rejected]: "Afvist",
        [ETaskStatus.Approved]: "Godkendt",
    };

    //Default values
    let image = "/Draft.png"
    let icon = <AddCircleOutlineOutlinedIcon sx={{ ...iconProps }} />;
    let isDisabled = false;
    let cursorStyle = "pointer";
    let opacityStyle = 1; 

    //Status Cases
    if (modelStatus == ETaskStatus.AwaitingApproval) {
        image = "/AwaitingApproval.png"
        icon = <HelpOutlineOutlinedIcon sx={{ ...iconProps }} />;
    } else if (modelStatus == ETaskStatus.Approved) {
        image = "/Approved.png"
        icon = <CheckCircleOutlinedIcon sx={{ ...iconProps }} />;
    } else if (modelStatus == ETaskStatus.Rejected) {
        image = "/Rejected.png"
        icon = <NotInterestedOutlinedIcon sx={{ ...iconProps }} />;
        isDisabled = true;
        cursorStyle = "not-allowed";
        opacityStyle = 0.5; 
    } else if (modelStatus == ETaskStatus.Draft) {
        image = "/Draft.png"
        icon = <AddCircleOutlineOutlinedIcon sx={{ ...iconProps }} />;
    }

    return (
      <React.Fragment>
        <Card sx={{ display: 'flex', opacity: opacityStyle, cursor: cursorStyle, marginTop, marginBottom }}>
            <IconButton aria-label="play/pause" disabled={isDisabled}>
            {icon}
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto', width: 220}}>
                <Typography variant="h6" sx={{ textAlign: 'left' }}>
                    {specialTask ? specialTask.title : TitleTranslator[modelStatus]}
                    {!specialTask && (<>
                        : {new Date(startTime).getDay()} / 
                        {new Date(startTime).getMonth() + 1} / 
                        {new Date(startTime).getUTCFullYear()}
                    </>)}
                </Typography>
                

                <Typography variant="subtitle1" component="div" sx={{ color: 'text.secondary', textAlign: 'left' }}>
                    {specialTask ? (
                        specialTask.undertitle
                    ) : (
                        <>
                            {new Date(startTime).getDay()} / 
                            {new Date(startTime).getMonth() + 1} / 
                            {new Date(startTime).getUTCFullYear()}
                        </>
                    )}
                </Typography>

                {startKilometers !== undefined && endKilometers !== undefined && startTime !== undefined && endTime !== undefined && (
                <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary', textAlign: 'left' }}
                >
                    {/* Calculate the total time in milliseconds */}
                    {(() => {
                    const timeDifference = new Date(endTime).getTime() - new Date(startTime).getTime();
                    const totalMinutes = timeDifference / (1000 * 60);
                    const hours = Math.floor(totalMinutes / 60); // Hours
                    const minutes = Math.floor(totalMinutes % 60); // Remaining minutes
                    return `Tid: ${hours}T ${minutes}M`; // Format as hours and minutes
                    })()}

                    {/* Display the total kilometers, rounded to 2 decimal places */}
                    / Km: {(endKilometers - startKilometers).toFixed(2)}
                </Typography>
                )}
            </CardContent>
          </Box>
          <CardMedia
                component="img"
                sx={{ ...imageProps, display: 'block', margin: 'auto'  }}
                image={image}
                alt="Image not Found"
            />
        </Card>
      </React.Fragment>
    );
  };

  export default TaskCardComp;