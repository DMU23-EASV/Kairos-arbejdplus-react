import React, { useContext, useState } from "react";
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

const TaskCardComp = ({ task, marginTop = '0px', marginBottom = '0px' }) => {
    const { status, title , undertitle, km, totaltime} = task;
    const iconProps = { height: 35, width: 35 };
    const imageProps = { width: 95, height: 95 };

    //Default values
    let image = "/Draft.png"
    let icon = <AddCircleOutlineOutlinedIcon sx={{ ...iconProps }} />;
    let isDisabled = false;
    let cursorStyle = "pointer";
    let opacityStyle = 1; 

    //Status Cases
    if (status === "AwaitingApproval") {
        image = "/AwaitingApproval.png"
        icon = <HelpOutlineOutlinedIcon sx={{ ...iconProps }} />;
    } else if (status === "Approved") {
        image = "/Approved.png"
        icon = <CheckCircleOutlinedIcon sx={{ ...iconProps }} />;
    } else if (status === "Rejected") {
        image = "/Rejected.png"
        icon = <NotInterestedOutlinedIcon sx={{ ...iconProps }} />;
        isDisabled = true;
        cursorStyle = "not-allowed";
        opacityStyle = 0.5; 
    } else if (status === "Draft") {
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
                {km > 0 && totaltime > 0 && (<Typography
                variant="subtitle1"
                component="div"
                sx={{ color: 'text.secondary', textAlign: 'left' }}
                >
                   Total Tid: {totaltime} / Km: {km}
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