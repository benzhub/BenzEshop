export interface AuthToken {
  refresh: string;
  access: string;
}

export interface UserLogin {
  userName: string;
  password: string;
}

export interface UserInfo {
  customer_id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type UserInfoSerialized = {
  customerId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
};