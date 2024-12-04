import React from "react";
import "../index.css"
import TaskCardComp from "./TaskCardComp";

const History = () => {
    const taskApproved = {
        title: "Godkendt",
        undertitle: "04 / 12 / 2024",
        status: "Approved", 
      };
    
      const taskDraft = {
        title: "Klade",
        undertitle: "04 / 12 / 2024",
        status: "Draft", 
      };

      const taskRejected = {
        title: "Afvist",
        undertitle: "04 / 12 / 2024",
        status: "Rejected", 
      }

      const taskWaiting = {
        title: "Venter Godkendelse",
        undertitle: "04 / 12 / 2024",
        status: "AwaitingApproval", 
      };

      const taskCreateNew = {
        title: "Ny Tidsregistrering",
        undertitle: "04 / 12 / 2024",
        status: "Draft", // Example status: add, edit, show
      };


    return (
      <div>
        <h2 align="left">Aktuelle</h2>
        <TaskCardComp task={taskCreateNew}/>
        <TaskCardComp task={taskDraft}/>
        <h2 align="left">History</h2>
        <TaskCardComp task={taskWaiting} />
        <TaskCardComp task={taskWaiting} />
        <TaskCardComp task={taskApproved}/>
        <TaskCardComp task={taskRejected}/>
      </div>
    );
  };
  
  export default History;