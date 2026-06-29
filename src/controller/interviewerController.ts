import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Route,
  Tags,
} from "tsoa";
import { HttpStatus } from "../helper/config/httpStatus";
import { InterviewerRepo } from "../repo/interviewerRepo";
import { logError } from "../helper/utils/logError";
import { JSONSchemaType } from "ajv";
import validate from "../helper/validation/validate";
import * as validationSchema from "../request/request";
import { IInterviewerResponse } from "../repo/types/responseTypes";

const interviewerRepo = new InterviewerRepo();

@Route("api/interviewer")
@Tags("Interviewer")
export class InterviewerController extends Controller {
  @Post()
  @Middlewares(validate(validationSchema.interviewerPostSchema))
  public async createInterviewer(
    @Body() body: validationSchema.InterviewerCreateType
  ): Promise<{ data?: IInterviewerResponse; error?: string }> {
    try {
      const [newInterviewer, error, httpStatus] = await interviewerRepo.createInterviewer(body);

      if (error) {
        this.setStatus(httpStatus);
        return { error: error.message };
      }
      this.setStatus(httpStatus);
      return { data: newInterviewer || undefined };
    } catch (error) {
      this.setStatus(HttpStatus.HTTP_INTERNAL_SERVER_ERROR);
      logError(error);
      return { error: error as string };
    }
  }

  @Get()
  public async getAllInterviewers(): Promise<{ data?: IInterviewerResponse[]; error?: string }> {
    try {
      const [interviewers, error, httpStatus] = await interviewerRepo.getAllInterviewers();

      if (error) {
        this.setStatus(httpStatus);
        return { error: error.message };
      }
      this.setStatus(httpStatus);
      return { data: interviewers };
    } catch (error) {
      this.setStatus(HttpStatus.HTTP_INTERNAL_SERVER_ERROR);
      logError(error);
      return { error: error as string };
    }
  }

  @Delete("{id}")
  public async deleteInterviewer(
    @Path() id: string
  ): Promise<{ data?: IInterviewerResponse; error?: string }> {
    try {
      const [interviewer, error, httpStatus] = await interviewerRepo.deleteInterviewer(id);
      if (error) {
        this.setStatus(httpStatus);
        return { error: error.message };
      }
      this.setStatus(httpStatus);
      return { data: interviewer || undefined };
    } catch (error) {
      this.setStatus(HttpStatus.HTTP_INTERNAL_SERVER_ERROR);
      logError(error);
      return { error: error as string };
    }
  }
}
