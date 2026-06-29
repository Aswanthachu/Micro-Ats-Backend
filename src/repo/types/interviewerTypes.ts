import { InterviewerCreateType } from "../../request/request";
import { IInterviewerResponse } from "./responseTypes";

export interface IInterviewerRepo {
  createInterviewer(interviewerData: InterviewerCreateType): Promise<[IInterviewerResponse | null, Error | null, number]>;
  getAllInterviewers(): Promise<[IInterviewerResponse[], Error | null, number]>;
  deleteInterviewer(id: string): Promise<[IInterviewerResponse | null, Error | null, number]>;
}
