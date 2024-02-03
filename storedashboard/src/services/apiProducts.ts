import axios, { AxiosResponse } from "axios";
import { type Product } from "../types/Product";
import { handleAxiosError } from "../utils/handleAxiosError";
const apiUrl = import.meta.env.VITE_API_URL;

export async function getProducts(): Promise<Product[]> {
  try {
    const response: AxiosResponse<Product[]> = await axios.get<Product[]>(`${apiUrl}/store/products/`);
    return response.data;

  } catch (error) {
    handleAxiosError(error);
  }
}

