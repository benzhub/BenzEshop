import axios, { AxiosError, AxiosResponse } from "axios";
import { type Product } from "../types/Product";
const apiUrl = import.meta.env.VITE_API_URL;

export async function getProducts(): Promise<Product[]> {
  try {
    const response: AxiosResponse<Product[]> = await axios.get<Product[]>(`${apiUrl}/store/products/`);
    return response.data;

  } catch (error) {
    handleAxiosError(error);
  }
}

function handleAxiosError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const axiosError: AxiosError = error;
    throw new Error(`Axios error: ${axiosError.message}`);
  } else if (error instanceof Error) {
    throw new Error(`Error: ${error.message}`);
  } else {
    throw new Error(`Unknown error occurred`);
  }
}
