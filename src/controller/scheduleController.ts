import {
  Body,
  Controller,
  Delete,
  Middlewares,
  Path,
  Post,
  Put,
  Route,
  Tags,
} from "tsoa";
import { HttpStatus } from "../helper/config/httpStatus";
import { ScheduleRepo } from "../repo/scheduleRepo";
import { logError } from "../helper/utils/logError";
import { JSONSchemaType } from "ajv";
import validate from "../helper/validation/validate";
import * as validationSchema from "../request/request";
import { ICandidateResponse } from "../repo/types/responseTypes";

const scheduleRepo = new ScheduleRepo();

@Route("api/schedule")
@Tags("Schedule")
export class ScheduleController extends Controller {
  @Post()
  @Middlewares(validate(validationSchema.schedulePostSchema))
  public async scheduleInterview(
    @Body() body: validationSchema.SchedulePostType
  ): Promise<{ data?: ICandidateResponse; error?: string; conflictingCandidate?: string | null }> {
    try {
      const [updatedCandidate, error, httpStatus, conflictingCandidate] = await scheduleRepo.scheduleInterview(body);

      if (error) {
        this.setStatus(httpStatus);
        return {
          error: error.message,
          conflictingCandidate: conflictingCandidate
        };
      }
      this.setStatus(httpStatus);
      return { data: updatedCandidate || undefined };
    } catch (error) {
      this.setStatus(HttpStatus.HTTP_INTERNAL_SERVER_ERROR);
      logError(error);
      return { error: error as string };
    }
  }

  @Delete("{candidateId}/{slotId}")
  public async cancelInterview(
    @Path() candidateId: string,
    @Path() slotId: string
  ): Promise<{ data?: ICandidateResponse; error?: string }> {
    try {
      const [candidate, error, httpStatus] = await scheduleRepo.cancelInterview(candidateId, slotId);
      if (error) {
        this.setStatus(httpStatus);
        return { error: error.message };
      }
      this.setStatus(httpStatus);
      return { data: candidate || undefined };
    } catch (error) {
      this.setStatus(HttpStatus.HTTP_INTERNAL_SERVER_ERROR);
      logError(error);
      return { error: error as string };
    }
  }

  @Put("{candidateId}/{slotId}")
  public async rescheduleInterview(
    @Path() candidateId: string,
    @Path() slotId: string,
    @Body() body: { startTime: string; endTime: string }
  ): Promise<{ data?: ICandidateResponse; error?: string; conflictingCandidate?: string | null }> {
    try {
      const [candidate, error, httpStatus, conflictingCandidate] = await scheduleRepo.rescheduleInterview(
        candidateId,
        slotId,
        body.startTime,
        body.endTime
      );
      if (error) {
        this.setStatus(httpStatus);
        return {
          error: error.message,
          conflictingCandidate
        };
      }
      this.setStatus(httpStatus);
      return { data: candidate || undefined };
    } catch (error) {
      this.setStatus(HttpStatus.HTTP_INTERNAL_SERVER_ERROR);
      logError(error);
      return { error: error as string };
    }
  }
}
