import React, { useContext } from "react";
import "../index.css"
import TaskCardComp from "./TaskCardComp";
import TaskListContext from "../TaskListContext";
import { TaskModel } from "../Models/TaskModel";

const History = () => {
  
    const taskApproved = {
        title: "Godkendt",
        undertitle: "04 / 12 / 2024",
        status: "Approved", 
        km: 100,
        totaltime: 10
      };
    
      const taskDraft = {
        title: "Klade",
        undertitle: "04 / 12 / 2024",
        status: "Draft", 
        km: 100,
        totaltime: 10
      };

      const taskRejected = {
        title: "Afvist",
        undertitle: "04 / 12 / 2024",
        status: "Rejected", 
        km: 100,
        totaltime: 10
      }

      const taskWaiting = {
        title: "Afventer Godkendelse",
        undertitle: "04 / 12 / 2024",
        status: "AwaitingApproval", 
        km: 100,
        totaltime: 10
      };

      //margin for our task cards
      const marginTopValue = "10px"
      const marginBottomValue = "10px"


      //List of tasks to display or not display if empty.
      const listOfTask = useContext(TaskListContext);


      console.log({ listOfTask })

  
      
      //Hardcoded New Task Option.
      const taskCreateNew = {
        title: "Ny Tidsregistrering",
        undertitle: "Registrering af nye data",
        status: "Draft",
        km: 0,
        totaltime: 0
      };

      // Filter tasks by status
      const DraftTasks = listOfTask
      .filter((task) => task.status === "Draft")
      .map((task, index) => <TaskCardComp key={index} task={task} marginTop={marginTopValue} marginBottom={marginBottomValue} />);

      const awaitapprovedTasks = listOfTask
      .filter((task) => task.status === "AwaitingApproval")
      .map((task, index) => <TaskCardComp key={index} task={task} marginTop={marginTopValue} marginBottom={marginBottomValue} />);

      const approvedTasks = listOfTask
      .filter((task) => task.status === "Approved")
      .map((task, index) => <TaskCardComp key={index} task={task} marginTop={marginTopValue} marginBottom={marginBottomValue} />);

      const rejectedTasks = listOfTask
      .filter((task) => task.status === "Rejected")
      .map((task, index) => <TaskCardComp key={index} task={task} marginTop={marginTopValue} marginBottom={marginBottomValue} />);

      // Check if there are no tasks at all
      const noTasks = listOfTask.length === 0;

      // Check if all history lists are empty
      const noHistoryTasks =
      awaitapprovedTasks.length === 0 &&
      approvedTasks.length === 0 &&
      rejectedTasks.length === 0;

    return (
      <div style={{ marginTop: '50px', marginBottom: '50px' }}>
        <h2 align="left">Aktuelle</h2>
        <TaskCardComp task={taskCreateNew} marginTop={marginTopValue} marginBottom={marginBottomValue}/>
        {noTasks ? (
        <p>Du har ingen registreringer endnu.<br />Opret en ny tidsregistrering for at komme i gang.</p>
      ) : (
        <>
          {DraftTasks}
          <h2 align="left">History</h2>
          {noHistoryTasks ? (
            <p>Ingen tidligere registreringer fundet.</p>
          ) : (
            <>
              {awaitapprovedTasks}
              {approvedTasks}
              {rejectedTasks}
            </>
          )}
        </>
      )}
      </div>
    );
  };
  
  export default History;