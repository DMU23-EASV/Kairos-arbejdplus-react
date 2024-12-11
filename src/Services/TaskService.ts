import { TaskModel } from "../Models/TaskModel";
import { getData, putData, postData, deleteData } from "./ApiService"; 


export const getTasks = async ({ username }: { username: string }): Promise<TaskModel[]> => {
    try {
      const tasks = await getData<TaskModel[]>(`api/taskbyusername/${username}`);
      return tasks; // Return only the task list without status or message
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      throw error;
    }
  };
  