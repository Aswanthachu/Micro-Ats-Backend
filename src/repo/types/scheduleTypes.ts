import { SchedulePostType } from "../../request/request";
import { ICandidateResponse } from "./responseTypes";

export interface IScheduleRepo {
  scheduleInterview(scheduleData: SchedulePostType): Promise<[ICandidateResponse | null, Error | null, number, string | null]>;
  cancelInterview(candidateId: string, slotId: string): Promise<[ICandidateResponse | null, Error | null, number]>;
  rescheduleInterview(candidateId: string, slotId: string, startTime: string, endTime: string): Promise<[ICandidateResponse | null, Error | null, number, string | null]>;
}
