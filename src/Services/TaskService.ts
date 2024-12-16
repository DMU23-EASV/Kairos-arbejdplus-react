import { TaskModel } from "../Models/TaskModel";
import {getData, putData, postData, deleteData, ApiResponse} from "./ApiService";



export const getTasks = async (): Promise<TaskModel[]> => {
    try {
      const tasks = await getData(`api/mytasks`);

      console.log(tasks.data)
      return tasks.data as TaskModel[];

    } catch (error) {
      console.error("Failed to fetch tasks", error);
      throw error;
    }
  };

export const PostTask = async ( task: TaskModel ): Promise<TaskModel> => {
  try {
    const postTask = await postData('task/', task)
    return postTask.data as TaskModel;
  } catch (error) {
    console.error("Failed to Post task", error);
    throw error;
  } 
}

export const PutTask = async ( task: TaskModel ): Promise<TaskModel> => {
  try {
  const putTask = await putData(`api/task/${task.bsonId}`, task)
    return putTask.data as TaskModel;
  } catch (error) {
    console.error("Failed to put task", error)
    throw error;
  }
}
  