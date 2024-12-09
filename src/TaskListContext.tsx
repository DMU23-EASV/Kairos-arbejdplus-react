import React, { createContext, ReactNode, useEffect, useState } from "react";
import { TaskModel } from "./Models/TaskModel";
import { getTasks } from "./Services/TaskService"

//Default context with empty string.
const TaskListContext = createContext<TaskModel[]>([]);

export const TaskListProvider = ({ children }: { children: ReactNode}) => {
    const [list, setList] = useState<TaskModel[]>([])

    useEffect ( () => {
        const fetchList = async () => {
            try {
                const response = await getTasks();
                setList(response)
            } catch (error) {
                console.error("Error API:Task ", error)
            }
        };
        fetchList();
    }, []);

    return (
        // Provide the task list (state) to the context consumers
        <TaskListContext.Provider value={list}>
            {children}
        </TaskListContext.Provider>
    );
}

export default TaskListContext;