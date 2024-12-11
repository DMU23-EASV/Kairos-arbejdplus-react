import { TaskModel } from "../Models/TaskModel";
import {getData, putData, postData, deleteData, ApiResponse} from "./ApiService";

interface ITaskService {
    taskmodels: TaskModel[];
    statusCode: number;
    message: string;
}


export const getTasks = async ({ username }: { username: string }): Promise<TaskModel[]> => {
    try {
      const tasks = await getData<ApiResponse<TaskModel[]>>(`api/taskbyusername/${username}`);

      console.log("Printing task context")
      console.log(tasks);


      return tasks.data; // Return only the task list without status or message
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      throw error;
    }
  };
  