import { Document, Schema, Types, model } from 'mongoose';

export interface IInterviewSlot {
  _id?: Types.ObjectId;
  interviewerId: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status?: 'Scheduled' | 'Cancelled';
  funnelStatus?: 'Applied' | 'Technical Round' | 'Offered';
}

export interface ICandidate extends Document {
  name: string;
  email: string;
  status: 'Applied' | 'Technical Round' | 'Offered';
  interviewSlots: IInterviewSlot[];
}

const interviewSlotSchema = new Schema<IInterviewSlot>({
  interviewerId: {
    type: Schema.Types.ObjectId,
    ref: 'Interviewer',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Cancelled'],
    default: 'Scheduled',
  },
  funnelStatus: {
    type: String,
    enum: ['Applied', 'Technical Round', 'Offered'],
    default: 'Applied',
  },
});

const candidateSchema = new Schema<ICandidate>(
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
    status: {
      type: String,
      enum: ['Applied', 'Technical Round', 'Offered'],
      default: 'Applied',
      index: true,
    },
    interviewSlots: {
      type: [interviewSlotSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const CandidateModel = model<ICandidate>('Candidate', candidateSchema);
