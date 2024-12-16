import React, { useContext, useState, useRef } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { ETaskStatus } from "../Enum/ETaskStatus"; 
import {Link, Navigate, useNavigate} from "react-router-dom";
import { TaskModel } from "../Models/TaskModel";
 
//Draft
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
//Approved
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
//AwaitingApproval
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
//Rejected
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import MainRegComp from "./MainRegComp";
import { Task } from "@mui/icons-material";

interface TaskCardCompProps {
    task: TaskModel; // The task prop is of type TaskModel
    marginTop?: string; // Optional prop
    marginBottom?: string; // Optional prop
    specialTask?: {
      title: string;
      undertitle: string;
    } | null; // Optional prop
  }
  
  const TaskCardComp: React.FC<TaskCardCompProps> = ({ task, marginTop = '0px', marginBottom = '0px', specialTask = null }) => {

    const navigate = useNavigate();

    function handleTaskClick():void {
        if (isDisabled){
            return;
        } else if (specialTask)
        {
            changeViewToTask();
            return;
        }
        console.log("SENDING DATE: " + task.startTime + "ID: " + task.id);
        navigate("/tasks", {state: {task}});
        //changeViewToTask();
    }

        // Reference to a hidden Link element for program navigation to "/history"
        const linkRefTask = useRef<HTMLAnchorElement>(null);


        /**
         * Function for changing view to /history
         */
        function changeViewToTask(): void {
            // Navigates user to "/tasks" if linkRefHistory isn't null
            if (linkRefTask.current) {
                linkRefTask.current.click();
            }
        }

    const iconProps = { height: 35, width: 35 };
    const imageProps = { width: 95, height: 95 };

    const { 
        _id,
        name,
        modelStatus,  
        startKilometers, 
        endKilometers,
        startTime,
        endTime,
        selecteDate} = task;

    const currentTask = specialTask || task;

    const TitleTranslator = {
        [ETaskStatus.Draft]: "Kladde",
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
        isDisabled = true;
        cursorStyle = "not-allowed"
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

    const areValuesDefined = (...values: any[]) => values.every(value => value !== undefined && value !== null);

    const calculateTimeDifference = (start: string, end: string) => {
        const timeDifference = new Date(end).getTime() - new Date(start).getTime();
        const totalMinutes = timeDifference / (1000 * 60);
        const hours = Math.floor(totalMinutes / 60).toString().padStart(2, "0");
        const minutes = Math.floor(totalMinutes % 60).toString().padStart(2, "0");
        return `${hours}:${minutes}(tt:mm)`;
    };

    const calculateDistance = (start: number, end: number) => (end - start).toFixed(0);

    return (
      <React.Fragment>
        <Card sx={{ display: 'flex', opacity: opacityStyle, cursor: cursorStyle, marginTop, marginBottom }} onClick={handleTaskClick}>
            <IconButton aria-label="play/pause" disabled={isDisabled}>
            {icon}
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto', width: 220}}>
                <Typography variant="h6" sx={{ textAlign: 'left' }}>
                    {specialTask ? specialTask.title : TitleTranslator[modelStatus]}
                </Typography>
                

                <Typography variant="subtitle1" component="div" sx={{ color: 'text.secondary', textAlign: 'left' }}>
                    {specialTask ? (
                        specialTask.undertitle
                    )  :  (
                        <>
                            {new Date(startTime).getDate()} / 
                            {new Date(startTime).getMonth() + 1} / 
                            {new Date(startTime).getUTCFullYear()}
                        </>
                    )}
                </Typography>

                {areValuesDefined(
                    task.startKilometers,
                    task.endKilometers,
                    task.startTime,
                    task.endTime
                ) ? (
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: "text.secondary", textAlign: "left" }}
                    >
                        Total Tid: {calculateTimeDifference(task.startTime, task.endTime)} <br /> Kilometer kørt:{" "}
                        {calculateDistance(task.startKilometers, task.endKilometers)}
                    </Typography>
                ) : specialTask ? (
                <p></p>
                ) : (
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: "text.secondary", textAlign: "left" }}
                    >
                        Tid og km er ikke angivet
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
        <Link to="/tasks" ref={linkRefTask} style={{display: 'none'}}/> 
      </React.Fragment>
    );
  };

  export default TaskCardComp;