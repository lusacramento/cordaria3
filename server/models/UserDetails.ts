import { Document, model, ObjectId, Schema } from "mongoose";
import { Location } from "~/types/Location";

export interface UserDetailsDocument extends Document {
  userId: ObjectId;
  fullName: string;
  age: number;
  location: Location;
  avatar: string;
}

const LocationSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const UserDetailsSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true,
    unique: true,
    index: true,
  },

  fullName: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  location: {
    type: LocationSchema,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
  },
});

export const UserDetails = model<UserDetailsDocument>(
  "UserDetails",
  UserDetailsSchema
);
