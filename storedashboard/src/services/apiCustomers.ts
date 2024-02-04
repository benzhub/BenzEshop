import axios, { AxiosResponse } from "axios";
import {
  type CustomerInfo,
  type CustomerInfoSerialized,
} from "../types/Customer";
import { handleAxiosError } from "../utils/handleAxiosError";
const apiUrl = import.meta.env.VITE_API_URL;

export async function getCustomers(): Promise<CustomerInfoSerialized[]> {
  const authToken = localStorage.getItem("token");
  if (!authToken) throw new Error("Credential invalidated!");
  try {
    const config = {
      method: "get",
      url: `${apiUrl}/store/manage/customers/`,
      headers: {
        Authorization: `JWT ${authToken}`,
      },
    };
    const response: AxiosResponse<CustomerInfo[]> = await axios.request(config);

    const customers: CustomerInfoSerialized[] = response.data.map(
      (customer: any) => {
        return {
          id: customer.id,
          email: customer.email,
          userName: customer.username,
          firstName: customer.first_name,
          lastName: customer.last_name,
          phoneNumber: customer.phone_number,
          birthDate: customer.birth_date,
          memberShip: customer.membership,
          lastLogin: customer.last_login,
          Active: customer.is_active,
        };
      },
    );
    return customers;
  } catch (error) {
    handleAxiosError(error);
  }
}
