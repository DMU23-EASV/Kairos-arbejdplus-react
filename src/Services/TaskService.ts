import { TaskModel } from "../Models/TaskModel";
import { getData, putData, postData, deleteData } from "./ApiService"; 


export const getTasks = async ({ username }: { username: string }): Promise<TaskModel[]> => {
    try {
        const response = await getData<TaskModel[]>(`api/taskbyusername/${username}`)
        
        //TODO: Remove debug!
        console.log("Message and status " + response.message + response.status)
        console.log ("RESPONSE DATA: " + response.data)
        return response.data;
    } catch (error) {
        console.error("Failed to fetch task", error)
        throw error;
    }
}