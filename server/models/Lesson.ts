import { LessonMessage } from "~/types/LessonMessage";
import { Document, model, Schema } from "mongoose";

export interface LessonDocument extends Document {
  number: number;
  level: string;
  firstFinger: number;
  stringNumber: string;
  bpm: number;
  message: LessonMessage;
  quantityOfStrings: string;
  points: number;
}

const LessonSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },

  level: {
    type: String,
    required: true,
  },

  firstFinger: {
    type: Number,
    required: true,
  },

  stringNumber: {
    type: String,
    required: true,
  },

  bpm: {
    type: Number,
    required: true,
  },

  message: {
    type: Object as unknown as LessonMessage,
    required: true,
  },

  quantityOfStrings: {
    type: Number,
    required: true,
  },

  points: {
    type: Number,
    required: true,
  },
});

export const Lesson = model<LessonDocument>("Lesson", LessonSchema);
