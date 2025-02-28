import { type ObjectId } from "mongoose";
import type { Location } from "./Location";
export interface UserDetails {
  _id: ObjectId;
  userId: ObjectId;
  fullName: string;
  age: number;
  state: string;
  country: string;
  avatar: string;
  location: Location;
}
