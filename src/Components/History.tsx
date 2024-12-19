import React, { useContext, useEffect, useState, useRef } from "react";
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
    // @ts-ignore
    const [loading, setLoading] = useState(false); // Track loading state
    const [tasks, setTasks] = useState<TaskModel[]>([]);

    // Wraped in useRef to avoid double loading.
    const hasFetched = useRef(false);

    const fetchTasks = async () => {
        if (!hasFetched.current && username && Context) {
            hasFetched.current = true;
            setLoading(true);
            try {
                const tasks = await getTasks();
                Context.setTask(tasks);
                setTasks(tasks);
            } catch (error) {
                console.error("Failed to fetch tasks, maybe no tasks?:", error);
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


      //Hardcoded New Task Option.
      const taskCreateNew = {
        title: "Ny Tidsregistrering",
        undertitle: "Registrering af nye data",
        km: 0,
        totaltime: 0
      };

      
      // Filter tasks by status
      const DraftTasks = tasks
      .filter((task) => task.modelStatus == ETaskStatus.Draft)
      .map((task, index) => <TaskCardComp key={index} task={task} marginTop={marginTopValue} marginBottom={marginBottomValue} />);

      const awaitapprovedTasks = tasks
      .filter((task) => task.modelStatus == ETaskStatus.AwaitingApproval)
      .map((task, index) => <TaskCardComp key={index} task={task} marginTop={marginTopValue} marginBottom={marginBottomValue} />);

      const approvedTasks = tasks
      .filter((task) => task.modelStatus == ETaskStatus.Approved)
      .map((task, index) => <TaskCardComp key={index} task={task} marginTop={marginTopValue} marginBottom={marginBottomValue} />);

      const rejectedTasks = tasks
      .filter((task) => task.modelStatus === ETaskStatus.Rejected)
      .map((task, index) => <TaskCardComp key={index} task={task} marginTop={marginTopValue} marginBottom={marginBottomValue} />);

      // Check if there are no tasks at all
      const noTasks = tasks.length === 0;
  
    
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