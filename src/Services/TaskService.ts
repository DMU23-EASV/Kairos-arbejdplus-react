import { TaskModel } from "../Models/TaskModel";
import {getData, putData, postData, deleteData, ApiResponse} from "./ApiService";



export const getTasks = async (): Promise<TaskModel[]> => {
    try {
      const tasks = await getData(`api/mytasks`);
      return tasks.data as TaskModel[];

    } catch (error) {
      console.error("Failed to fetch tasks", error);
      throw error;
    }
  };
  