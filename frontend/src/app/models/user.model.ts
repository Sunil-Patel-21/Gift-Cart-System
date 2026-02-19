export interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: Address;
  createdAt?: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
