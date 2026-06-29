import { CandidateCreateType } from "../../request/request";
import { ICandidateResponse } from "./responseTypes";

export interface ICandidateRepo {
  createCandidate(candidateData: CandidateCreateType): Promise<[ICandidateResponse | null, Error | null, number]>;
  getAllCandidates(): Promise<[ICandidateResponse[], Error | null, number]>;
  updateStatus(id: string, status: string): Promise<[ICandidateResponse | null, Error | null, number]>;
  deleteCandidate(id: string): Promise<[ICandidateResponse | null, Error | null, number]>;
}
