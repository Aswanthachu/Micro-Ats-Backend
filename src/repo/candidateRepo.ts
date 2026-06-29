import { HttpStatus } from '../helper/config/httpStatus';
import { logError } from '../helper/utils/logError';
import { CandidateModel } from '../model/candidate';
import { CandidateCreateType } from '../request/request';
import { ICandidateRepo } from './types/candidateTypes';
import { ICandidateResponse } from './types/responseTypes';

export class CandidateRepo implements ICandidateRepo {
  public async createCandidate(candidateData: CandidateCreateType): Promise<[ICandidateResponse | null, Error | null, number]> {
    try {
      const { name, email } = candidateData;

      const existing = await CandidateModel.findOne({ email });
      if (existing) {
        return [null, new Error('Candidate already exists with this email'), HttpStatus.HTTP_BAD_REQUEST];
      }

      const candidate = await CandidateModel.create({ name, email });
      return [candidate, null, HttpStatus.HTTP_CREATED];
    } catch (error) {
      logError(error);
      return [null, new Error(error as string), HttpStatus.HTTP_INTERNAL_SERVER_ERROR];
    }
  }

  public async getAllCandidates(): Promise<[ICandidateResponse[], Error | null, number]> {
    try {
      const candidates = await CandidateModel.find().populate('interviewSlots.interviewerId', 'name email');
      return [candidates, null, HttpStatus.HTTP_SUCCESS];
    } catch (error) {
      logError(error);
      return [[], new Error(error as string), HttpStatus.HTTP_INTERNAL_SERVER_ERROR];
    }
  }

  public async updateStatus(id: string, status: string): Promise<[ICandidateResponse | null, Error | null, number]> {
    try {
      const candidate = await CandidateModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).populate('interviewSlots.interviewerId', 'name email');

      if (!candidate) {
        return [null, new Error('Candidate not found'), HttpStatus.HTTP_NOT_FOUND];
      }

      return [candidate, null, HttpStatus.HTTP_SUCCESS];
    } catch (error) {
      logError(error);
      return [null, new Error(error as string), HttpStatus.HTTP_INTERNAL_SERVER_ERROR];
    }
  }

  public async deleteCandidate(id: string): Promise<[ICandidateResponse | null, Error | null, number]> {
    try {
      const candidate = await CandidateModel.findByIdAndDelete(id);
      if (!candidate) {
        return [null, new Error('Candidate not found'), HttpStatus.HTTP_NOT_FOUND];
      }
      return [candidate, null, HttpStatus.HTTP_SUCCESS];
    } catch (error) {
      logError(error);
      return [null, new Error(error as string), HttpStatus.HTTP_INTERNAL_SERVER_ERROR];
    }
  }
}
