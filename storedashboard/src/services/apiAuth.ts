import axios, { AxiosResponse } from "axios";
import { type AuthToken, type UserLogin, type UserInfo } from "../types/Auth";
import { handleAxiosError } from "../utils/handleAxiosError";
const apiUrl = import.meta.env.VITE_API_URL;

export async function login(userLogin: UserLogin): Promise<AuthToken> {
  try {
    const data = JSON.stringify(userLogin);

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

export async function getCurrentUser(): Promise<UserInfo> {
  const authToken = localStorage.getItem("token");
  if(!authToken) throw new Error("Credential invalidated!");
  try {
    const config = {
      method: "get",
      url: `${apiUrl}/auth/users/me/`,
      headers: {
        Authorization: `JWT ${authToken}`,
      },
    }
    const response: AxiosResponse<UserInfo> = await axios.request(config);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function logout() {
  localStorage.clear();
}