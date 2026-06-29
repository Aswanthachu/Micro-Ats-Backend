import mongoose from 'mongoose';
import { HttpStatus } from '../helper/config/httpStatus';
import { logError } from '../helper/utils/logError';
import { InterviewerModel } from '../model/interviewer';
import { CandidateModel } from '../model/candidate';
import { InterviewerCreateType } from '../request/request';
import { IInterviewerRepo } from './types/interviewerTypes';
import { IInterviewerResponse } from './types/responseTypes';

export class InterviewerRepo implements IInterviewerRepo {
  public async createInterviewer(interviewerData: InterviewerCreateType): Promise<[IInterviewerResponse | null, Error | null, number]> {
    try {
      const { name, email } = interviewerData;

      const existing = await InterviewerModel.findOne({ email });
      if (existing) {
        return [null, new Error('Interviewer already exists with this email'), HttpStatus.HTTP_BAD_REQUEST];
      }

      const interviewer = await InterviewerModel.create({ name, email });
      return [interviewer, null, HttpStatus.HTTP_CREATED];
    } catch (error) {
      logError(error);
      return [null, new Error(error as string), HttpStatus.HTTP_INTERNAL_SERVER_ERROR];
    }
  }

  public async getAllInterviewers(): Promise<[IInterviewerResponse[], Error | null, number]> {
    try {
      const interviewers = await InterviewerModel.find();
      return [interviewers, null, HttpStatus.HTTP_SUCCESS];
    } catch (error) {
      logError(error);
      return [[], new Error(error as string), HttpStatus.HTTP_INTERNAL_SERVER_ERROR];
    }
  }

  public async deleteInterviewer(id: string): Promise<[IInterviewerResponse | null, Error | null, number]> {
    try {
      const interviewer = await InterviewerModel.findByIdAndDelete(id);
      if (!interviewer) {
        return [null, new Error('Interviewer not found'), HttpStatus.HTTP_NOT_FOUND];
      }
      
      // Cascade Delete: remove scheduled slots with this interviewer from all candidates
      await CandidateModel.updateMany(
        {},
        {
          $pull: {
            interviewSlots: {
              interviewerId: new mongoose.Types.ObjectId(id)
            }
          }
        }
      );
      
      return [interviewer, null, HttpStatus.HTTP_SUCCESS];
    } catch (error) {
      logError(error);
      return [null, new Error(error as string), HttpStatus.HTTP_INTERNAL_SERVER_ERROR];
    }
  }
}
