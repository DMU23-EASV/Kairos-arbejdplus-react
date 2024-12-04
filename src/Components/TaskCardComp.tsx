import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';

//Draft
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
//Approved
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
//AwaitingApproval
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
//Rejected
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
const TaskCardComp = ({ task }) => {
    //Draft, AwaitingApproval, Rejected, Approved
    const { status, title , undertitle} = task;

    //Default values
    let image = "/Draft.png"
    let icon = <AddCircleOutlineOutlinedIcon sx={{ height: 35, width: 35 }} />;
    let isDisabled = false;
    let cursorStyle = "pointer";
    let opacityStyle = 1; 

    //Status Cases
    if (status === "AwaitingApproval") {
        image = "/AwaitingApproval.png"
        icon = <HelpOutlineOutlinedIcon sx={{ height: 35, width: 35 }} />;
    } else if (status === "Approved") {
        image = "/Approved.png"
        icon = <CheckCircleOutlinedIcon sx={{ height: 35, width: 35 }} />;
    } else if (status === "Rejected") {
        image = "/Rejected.png"
        icon = <NotInterestedOutlinedIcon sx={{ height: 35, width: 35 }} />;
        isDisabled = true;
        cursorStyle = "not-allowed";
        opacityStyle = 0.5; 
    } else if (status === "Draft") {
        image = "/Draft.png"
        icon = <AddCircleOutlineOutlinedIcon sx={{ height: 35, width: 35 }} />;
    }

    return (
      <React.Fragment>
        <Card sx={{ display: 'flex', opacity: opacityStyle, cursor: cursorStyle }}>
            <IconButton aria-label="play/pause" disabled={isDisabled}>
            {icon}
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto', width: 220}}>
                <Typography variant="h6"
                sx={{ textAlign: 'left' }}
                >
                    {title}
                </Typography>
                <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: 'text.secondary', textAlign: 'left' }}
                >
                    {undertitle}
                </Typography>
            </CardContent>
          </Box>
          <CardMedia
                component="img"
                sx={{ width: 95, height: 95 }}
                image={image}
                alt="Image not Found"
            />
        </Card>
      </React.Fragment>
    );
  };

  export default TaskCardComp;