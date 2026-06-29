import { Document, Schema, model } from 'mongoose';

export interface IInterviewer extends Document {
  name: string;
  email: string;
}

const interviewerSchema = new Schema<IInterviewer>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const InterviewerModel = model<IInterviewer>('Interviewer', interviewerSchema);
