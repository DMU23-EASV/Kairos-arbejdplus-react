import React from "react";
import "../index.css"
import TaskCardComp from "./TaskCardComp";

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
        title: "Venter Godkendelse",
        undertitle: "04 / 12 / 2024",
        status: "AwaitingApproval", 
        km: 100,
        totaltime: 10
      };

      const taskCreateNew = {
        title: "Ny Tidsregistrering",
        undertitle: "04 / 12 / 2024",
        status: "Draft",
        km: 100,
        totaltime: 10
      };


    return (
      <div style={{ marginTop: '50px', marginBottom: '50px' }}>
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