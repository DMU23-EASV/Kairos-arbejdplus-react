import React, { createContext, useState, useContext, ReactNode } from "react";
import { TaskModel } from "../Models/TaskModel";

const TaskContext = createContext<{
    tasks: TaskModel[];
    addTask: (task: TaskModel) => void;
  } | undefined>(undefined);

  // Define the props for the TaskProvider component
interface TaskProviderProps {
    children: ReactNode;
  }

  
// Create a provider component
export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskModel[]>([]);
  
    // Function to add a task
    const addTask = (task: TaskModel) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    };
  
    return (
      <TaskContext.Provider value={{ tasks, addTask }}>
        {children}
      </TaskContext.Provider>
    );
  };
  
  // Custom hook to use the TaskContext
  export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
      throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
  };