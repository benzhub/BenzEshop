import axios, { AxiosResponse } from "axios";
import { type AuthToken, type UserLogin, type UserInfo, type UserInfoSerialized } from "../types/Auth";
import { handleAxiosError } from "../utils/handleAxiosError";
import { getAuthToken } from "../utils/getAuthToken";
const apiUrl = import.meta.env.VITE_API_URL;

export async function login(userLogin: UserLogin): Promise<AuthToken> {
  try {
    const data = JSON.stringify({
      username: userLogin.userName,
      password: userLogin.password
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiUrl}/auth/jwt/create/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response: AxiosResponse<AuthToken> = await axios.request(config);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function getCurrentUser(): Promise<UserInfoSerialized> {
  try {
    const authToken = getAuthToken();
    const config = {
      method: "get",
      url: `${apiUrl}/auth/users/me/`,
      headers: {
        Authorization: `JWT ${authToken}`,
      },
    }
    const response: AxiosResponse<UserInfo> = await axios.request(config);
    return {
      customerId: response.data.customer_id,
      userName: response.data.username,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
    }
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function logout() {
  localStorage.clear();
}