import { JSONSchemaType } from "ajv";

// Candidate
export type CandidateCreateType = {
  name: string;
  email: string;
};

export const candidatePostSchema: JSONSchemaType<CandidateCreateType> = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" }
  },
  required: ["name", "email"],
  additionalProperties: false,
};

// Interviewer
export type InterviewerCreateType = {
  name: string;
  email: string;
};

export const interviewerPostSchema: JSONSchemaType<InterviewerCreateType> = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" }
  },
  required: ["name", "email"],
  additionalProperties: false,
};

// Schedule Booking
export type SchedulePostType = {
  candidateId: string;
  interviewerId: string;
  startTime: string;
  endTime: string;
  funnelStatus?: "Applied" | "Technical Round" | "Offered";
};

export const schedulePostSchema: JSONSchemaType<SchedulePostType> = {
  type: "object",
  properties: {
    candidateId: { type: "string", minLength: 24, maxLength: 24 },
    interviewerId: { type: "string", minLength: 24, maxLength: 24 },
    startTime: { type: "string" },
    endTime: { type: "string" },
    funnelStatus: { type: "string", enum: ["Applied", "Technical Round", "Offered"], nullable: true }
  },
  required: ["candidateId", "interviewerId", "startTime", "endTime"],
  additionalProperties: false,
};

// Candidate Status Toggle
export type CandidateStatusPutType = {
  id: string;
  status: "Applied" | "Technical Round" | "Offered";
};

export const candidateStatusPutSchema: JSONSchemaType<CandidateStatusPutType> = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 24, maxLength: 24 },
    status: { type: "string", enum: ["Applied", "Technical Round", "Offered"] }
  },
  required: ["id", "status"],
  additionalProperties: false,
};
