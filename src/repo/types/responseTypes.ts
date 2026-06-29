import mongoose from 'mongoose';

export interface IInterviewerSummary {
  _id?: string | mongoose.Types.ObjectId;
  name: string;
  email: string;
}

export interface IInterviewSlotResponse {
  _id?: string | mongoose.Types.ObjectId;
  interviewerId: string | mongoose.Types.ObjectId | IInterviewerSummary;
  startTime: Date | string;
  endTime: Date | string;
  status?: 'Scheduled' | 'Cancelled';
  funnelStatus?: 'Applied' | 'Technical Round' | 'Offered';
}

export interface ICandidateResponse {
  _id?: string | mongoose.Types.ObjectId;
  name: string;
  email: string;
  status: 'Applied' | 'Technical Round' | 'Offered';
  interviewSlots: IInterviewSlotResponse[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IInterviewerResponse {
  _id?: string | mongoose.Types.ObjectId;
  name: string;
  email: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
