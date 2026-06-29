import mongoose from 'mongoose';
import { HttpStatus } from '../helper/config/httpStatus';
import { logError } from '../helper/utils/logError';
import { CandidateModel } from '../model/candidate';
import { InterviewerModel } from '../model/interviewer';
import { SchedulePostType } from '../request/request';
import { IScheduleRepo } from './types/scheduleTypes';
import { ICandidateResponse } from './types/responseTypes';

export class ScheduleRepo implements IScheduleRepo {
  public async scheduleInterview(
    scheduleData: SchedulePostType
  ): Promise<[ICandidateResponse | null, Error | null, number, string | null]> {
    try {
      const { candidateId, interviewerId, startTime, endTime, funnelStatus } = scheduleData;

      if (!mongoose.Types.ObjectId.isValid(candidateId) || !mongoose.Types.ObjectId.isValid(interviewerId)) {
        return [null, new Error('Invalid ID format'), HttpStatus.HTTP_BAD_REQUEST, null];
      }

      const candidate = await CandidateModel.findById(candidateId);
      if (!candidate) {
        return [null, new Error('Candidate not found'), HttpStatus.HTTP_NOT_FOUND, null];
      }

      const interviewer = await InterviewerModel.findById(interviewerId);
      if (!interviewer) {
        return [null, new Error('Interviewer not found'), HttpStatus.HTTP_NOT_FOUND, null];
      }

      const start = new Date(startTime);
      const end = new Date(endTime);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return [null, new Error('Invalid start or end time format'), HttpStatus.HTTP_BAD_REQUEST, null];
      }

      if (start >= end) {
        return [null, new Error('Start time must be before end time'), HttpStatus.HTTP_BAD_REQUEST, null];
      }

      const now = new Date();
      if (start < now) {
        return [null, new Error('Cannot schedule interviews in the past'), HttpStatus.HTTP_BAD_REQUEST, null];
      }

      // Check if the interviewer already has an overlapping active meeting at that time (ignoring Cancelled slots)
      const conflictingCandidate = await CandidateModel.findOne({
        interviewSlots: {
          $elemMatch: {
            interviewerId: new mongoose.Types.ObjectId(interviewerId),
            status: { $ne: 'Cancelled' },
            startTime: { $lt: end },
            endTime: { $gt: start }
          }
        }
      });

      if (conflictingCandidate) {
        return [
          null,
          new Error(`Interviewer is already booked at this time with Candidate: ${conflictingCandidate.name}`),
          HttpStatus.HTTP_CONFLICT,
          conflictingCandidate.name
        ];
      }

      const activeFunnelStatus = funnelStatus || candidate.status;

      // Push new interview slot to candidate's list and update candidate's status
      const updatedCandidate = await CandidateModel.findByIdAndUpdate(
        candidateId,
        {
          $set: { status: activeFunnelStatus },
          $push: {
            interviewSlots: {
              interviewerId: new mongoose.Types.ObjectId(interviewerId),
              startTime: start,
              endTime: end,
              status: 'Scheduled',
              funnelStatus: activeFunnelStatus
            }
          }
        },
        { new: true }
      ).populate('interviewSlots.interviewerId', 'name email');

      return [updatedCandidate, null, HttpStatus.HTTP_SUCCESS, null];
    } catch (error) {
      logError(error);
      return [null, new Error(error as string), HttpStatus.HTTP_INTERNAL_SERVER_ERROR, null];
    }
  }

  public async cancelInterview(candidateId: string, slotId: string): Promise<[ICandidateResponse | null, Error | null, number]> {
    try {
      if (!mongoose.Types.ObjectId.isValid(candidateId) || !mongoose.Types.ObjectId.isValid(slotId)) {
        return [null, new Error('Invalid ID format'), HttpStatus.HTTP_BAD_REQUEST];
      }
      
      // Soft-cancel: update the status of the nested slot to 'Cancelled'
      const updatedCandidate = await CandidateModel.findOneAndUpdate(
        { _id: candidateId, 'interviewSlots._id': new mongoose.Types.ObjectId(slotId) },
        {
          $set: {
            'interviewSlots.$.status': 'Cancelled'
          }
        },
        { new: true }
      ).populate('interviewSlots.interviewerId', 'name email');

      if (!updatedCandidate) {
        return [null, new Error('Candidate or interview slot not found'), HttpStatus.HTTP_NOT_FOUND];
      }
      return [updatedCandidate, null, HttpStatus.HTTP_SUCCESS];
    } catch (error) {
      logError(error);
      return [null, new Error(error as string), HttpStatus.HTTP_INTERNAL_SERVER_ERROR];
    }
  }

  public async rescheduleInterview(
    candidateId: string,
    slotId: string,
    startTime: string,
    endTime: string
  ): Promise<[ICandidateResponse | null, Error | null, number, string | null]> {
    try {
      if (!mongoose.Types.ObjectId.isValid(candidateId) || !mongoose.Types.ObjectId.isValid(slotId)) {
        return [null, new Error('Invalid ID format'), HttpStatus.HTTP_BAD_REQUEST, null];
      }

      const candidate = await CandidateModel.findById(candidateId);
      if (!candidate) {
        return [null, new Error('Candidate not found'), HttpStatus.HTTP_NOT_FOUND, null];
      }

      // Find the slot to be updated to get the interviewerId
      const slot = candidate.interviewSlots.find(s => s._id?.toString() === slotId);
      if (!slot) {
        return [null, new Error('Interview slot not found'), HttpStatus.HTTP_NOT_FOUND, null];
      }

      const interviewerId = slot.interviewerId.toString();

      const start = new Date(startTime);
      const end = new Date(endTime);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return [null, new Error('Invalid start or end time format'), HttpStatus.HTTP_BAD_REQUEST, null];
      }

      if (start >= end) {
        return [null, new Error('Start time must be before end time'), HttpStatus.HTTP_BAD_REQUEST, null];
      }

      const now = new Date();
      if (start < now) {
        return [null, new Error('Cannot reschedule interviews in the past'), HttpStatus.HTTP_BAD_REQUEST, null];
      }

      // Overlap check: check if the interviewer has any other active slots that overlap, excluding THIS slot!
      const conflictingCandidate = await CandidateModel.findOne({
        interviewSlots: {
          $elemMatch: {
            _id: { $ne: new mongoose.Types.ObjectId(slotId) },
            interviewerId: new mongoose.Types.ObjectId(interviewerId),
            status: { $ne: 'Cancelled' },
            startTime: { $lt: end },
            endTime: { $gt: start }
          }
        }
      });

      if (conflictingCandidate) {
        return [
          null,
          new Error(`Interviewer is already booked at this time with Candidate: ${conflictingCandidate.name}`),
          HttpStatus.HTTP_CONFLICT,
          conflictingCandidate.name
        ];
      }

      // Update the specific slot inside candidate's interviewSlots array and set status to Scheduled
      const updatedCandidate = await CandidateModel.findOneAndUpdate(
        { _id: candidateId, 'interviewSlots._id': new mongoose.Types.ObjectId(slotId) },
        {
          $set: {
            'interviewSlots.$.startTime': start,
            'interviewSlots.$.endTime': end,
            'interviewSlots.$.status': 'Scheduled'
          }
        },
        { new: true }
      ).populate('interviewSlots.interviewerId', 'name email');

      return [updatedCandidate, null, HttpStatus.HTTP_SUCCESS, null];
    } catch (error) {
      logError(error);
      return [null, new Error(error as string), HttpStatus.HTTP_INTERNAL_SERVER_ERROR, null];
    }
  }
}
