import { Location } from "~/types/Location";
import { Document, model, Schema } from "mongoose";

export interface DeletedUser extends Document {
  age: number;
  location: Location;
  deleteAt: Date;
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

const DeletedUserSchema = new Schema({
  age: {
    type: Number,
    required: true,
  },

  location: {
    type: LocationSchema,
    required: true,
  },

  deleteAt: {
    type: Date,
    default: Date.now,
  },
});

export const DeletedUser = model<DeletedUser>("DeletedUser", DeletedUserSchema);
