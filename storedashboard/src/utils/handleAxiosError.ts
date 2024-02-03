import axios, { AxiosError } from "axios";

interface CustomErrorData {
  detail?: string;
}

export function handleAxiosError(error: unknown): never {
  
  if (axios.isAxiosError(error)) {
    const axiosError: AxiosError<CustomErrorData> = error;

    if (axiosError.response?.status === 401) {
      if (axiosError.response.data && typeof axiosError.response.data.detail === 'string') {
        throw new Error(`${axiosError.response.data.detail}`);
      }
    }

    throw new Error(`Axios error: ${axiosError.message}`);
  } else if (error instanceof Error) {
    throw new Error(`Error: ${error.message}`);
  } else {
    throw new Error(`Provided email or password are incorrect`);
  }
}
