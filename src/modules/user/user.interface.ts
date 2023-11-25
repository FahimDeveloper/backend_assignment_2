/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: Array<string>;
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: Array<TOrder>;
}

export interface TOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface TUserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}
