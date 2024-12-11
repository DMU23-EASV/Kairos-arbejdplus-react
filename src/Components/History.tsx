import React, { useContext, useEffect, useState } from "react";
import "../index.css"
import TaskCardComp from "./TaskCardComp";
import { TaskModel } from "../Models/TaskModel";
import TaskContext from "../TaskContext";
import { ETaskStatus } from "../Enum/ETaskStatus";
import { getTasks } from "../Services/TaskService";
import { Task } from "@mui/icons-material";

const History = () => {

  const Context = useContext(TaskContext)

  const username = sessionStorage.getItem("username")
  
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch tasks

    const fetchTasks = async () => {
        setLoading(true);
        if (username && Context) {
            try {
                const tasks = await getTasks({ username });

                console.log("PRINTING TASKS FROM HISTORY VIEW");
                console.log(tasks);



                Context.setTask(tasks); // Update context with fetched tasks
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            } finally {
                setLoading(false);
            }
        }
    };

  useEffect(() => {
    fetchTasks(); // Call fetchTasks on component mount
  }, [username]); 


      //margin for our task cards
      const marginTopValue = "10px"
      const marginBottomValue = "10px"


      //List of tasks to display or not display if empty.

      // List of tasks
      const listOfTask = Context?.tasks ?? [];

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
      .filter((task) => task.modelStatus == ETaskStatus.Draft)
      .map((task, index) => <TaskCardComp key={index} task={task} marginTop={marginTopValue} marginBottom={marginBottomValue} />);

      const awaitapprovedTasks = listOfTask
      .filter((task) => task.modelStatus == ETaskStatus.AwaitingApproval)
      .map((task, index) => <TaskCardComp key={index} task={task} marginTop={marginTopValue} marginBottom={marginBottomValue} />);

      const approvedTasks = listOfTask
      .filter((task) => task.modelStatus == ETaskStatus.Approved)
      .map((task, index) => <TaskCardComp key={index} task={task} marginTop={marginTopValue} marginBottom={marginBottomValue} />);

      const rejectedTasks = listOfTask
      .filter((task) => task.modelStatus === ETaskStatus.Rejected)
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
        <TaskCardComp task={Task} marginTop={marginTopValue} marginBottom={marginBottomValue} specialTask={taskCreateNew}/>
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