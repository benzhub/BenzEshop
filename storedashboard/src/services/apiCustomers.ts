import axios, { AxiosResponse } from "axios";
import { type CustomerInfo } from "../types/Customer";
import { handleAxiosError } from "../utils/handleAxiosError";
const apiUrl = import.meta.env.VITE_API_URL;

export async function getCustomers(): Promise<CustomerInfo[]> {
  const authToken = localStorage.getItem("token");
  if(!authToken) throw new Error("Credential invalidated!");
  try {
    const config = {
      method: "get",
      url: `${apiUrl}/store/manage/customers/`,
      headers: {
        Authorization: `JWT ${authToken}`,
      },
    }
    const response: AxiosResponse<CustomerInfo[]> = await axios.request(config);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}