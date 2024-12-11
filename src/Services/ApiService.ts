import { API_BASE_URL } from "../Constants";

// apiService.ts
const BASE_URL = API_BASE_URL

// Define the headers once, if they don't change
const headers = {
  'Content-Type': 'application/json',
  // Any other global headers
};

// Utility type for API responses.
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Function for making GET requests
export const getData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers,
    });
    if (!response.ok) {
      console.error(`HTTP Error ::: URL ${BASE_URL} | ENDPOINT ${endpoint}`);
      throw new Error(`HTTP Error Code: ${response.status}`);
    }
    const data: T = await response.json();
    console.log("WAT UP " + data)
    return data; // Only return the raw data (task list)
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function for making POST requests
export const postData = async <T>(endpoint: string, data: T): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error(`HTTP Error ::: URL ${BASE_URL} | ENDPOINT ${endpoint}`)
      throw new Error(`HTTP Error Code: ${response.status}`);
    }
    const responseData: T = await response.json();
    return { data: responseData, status: response.status, message: 'Data posted successfully' };
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

// Function for making PUT requests
export const putData = async <T>(endpoint: string, data: T): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error(`HTTP Error ::: URL ${BASE_URL} | ENDPOINT ${endpoint}`)
      throw new Error(`HTTP Error Code: ${response.status}`);
    }
    const responseData: T = await response.json();
    return { data: responseData, status: response.status, message: 'Data updated successfully' };
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

// Function for making DELETE requests
export const deleteData = async (endpoint: string): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) {
      console.error(`HTTP Error ::: URL ${BASE_URL} | ENDPOINT ${endpoint}`)
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return { data: null, status: response.status, message: 'Data deleted successfully' };
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
