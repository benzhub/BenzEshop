import axios, { AxiosError } from "axios";

export function handleAxiosError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const axiosError: AxiosError = error;
    throw new Error(`Axios error: ${axiosError.message}`);
  } else if (error instanceof Error) {
    throw new Error(`Error: ${error.message}`);
  } else {
    throw new Error(`Unknown error occurred`);
  }
}
