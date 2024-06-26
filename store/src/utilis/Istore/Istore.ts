import { Document } from 'mongoose';

export default interface IStore extends Document {
  storeName: string;
  productId: string;
  email: string;
  password: string;
  contact: number;
  address: string;
  description?: string;
  isActive: boolean; // lowercase 'boolean'
  isDeleted: boolean; // lowercase 'boolean'
  // message?: string;
  timeStamp: number;
}
