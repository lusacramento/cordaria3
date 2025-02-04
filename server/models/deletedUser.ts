import { Document, model, ObjectId, Schema } from "mongoose";

export interface DeletedUser extends Document {
  age: number;
  state: string;
  country: string;
  deleteAt: Date;
}

const DeletedUserSchema = new Schema({
  age: {
    type: Number,
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
  deleteAt: {
    type: Date,
    default: Date.now,
  },
});

export const DeletedUser = model<DeletedUser>("DeletedUser", DeletedUserSchema);
