export interface CustomerInfo {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  birth_date: string;
  membership: string;
  last_login: string;
  is_active: boolean;
}

export type CustomerInfoSerialized = {
  id: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  memberShip: string;
  lastLogin: string;
  Active: boolean;
};