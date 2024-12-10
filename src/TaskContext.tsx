import { createContext, ReactNode, useState } from "react";
import { TaskModel } from "./Models/TaskModel";

export interface TaskContextInterface {

    tasks: TaskModel[]; 
    addTask: (task: TaskModel) => void; 
    setTask: (task: TaskModel[]) => void;
    getTask: () => TaskModel[]
}


// Context
const TaskContext = createContext<TaskContextInterface | undefined>(undefined); 

export const TaskProvider : React.FC<{children : ReactNode}> = ({children}) =>{

    const [tasks, setTasks] = useState<TaskModel[]>([]);

    const addTask = (task: TaskModel) => {
        setTasks((prevTasks) => [...prevTasks, task]);
        console.log("Added Task!")
    }

    const getTask = () => {
        return tasks
    }
    
    const setTask = (newTasks: TaskModel[]) => {
        setTasks(newTasks);
        console.log("Tasks updated!");
    };

    return (
        <TaskContext.Provider value={{addTask, getTask, setTask, tasks}}>
            {children}
        </TaskContext.Provider>
    )

}


export default TaskContext