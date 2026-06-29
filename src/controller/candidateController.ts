import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Route,
  Tags,
} from "tsoa";
import { HttpStatus } from "../helper/config/httpStatus";
import { CandidateRepo } from "../repo/candidateRepo";
import { logError } from "../helper/utils/logError";
import { JSONSchemaType } from "ajv";
import validate from "../helper/validation/validate";
import * as validationSchema from "../request/request";
import { ICandidateResponse } from "../repo/types/responseTypes";

const candidateRepo = new CandidateRepo();

@Route("api/candidate")
@Tags("Candidate")
export class CandidateController extends Controller {
  @Post()
  @Middlewares(validate(validationSchema.candidatePostSchema))
  public async createCandidate(
    @Body() body: validationSchema.CandidateCreateType
  ): Promise<{ data?: ICandidateResponse; error?: string }> {
    try {
      const [newCandidate, error, httpStatus] = await candidateRepo.createCandidate(body);

      if (error) {
        this.setStatus(httpStatus);
        return { error: error.message };
      }
      this.setStatus(httpStatus);
      return { data: newCandidate || undefined };
    } catch (error) {
      this.setStatus(HttpStatus.HTTP_INTERNAL_SERVER_ERROR);
      logError(error);
      return { error: error as string };
    }
  }

  @Get()
  public async getAllCandidates(): Promise<{ data?: ICandidateResponse[]; error?: string }> {
    try {
      const [candidates, error, httpStatus] = await candidateRepo.getAllCandidates();

      if (error) {
        this.setStatus(httpStatus);
        return { error: error.message };
      }
      this.setStatus(httpStatus);
      return { data: candidates };
    } catch (error) {
      this.setStatus(HttpStatus.HTTP_INTERNAL_SERVER_ERROR);
      logError(error);
      return { error: error as string };
    }
  }

  @Put("{id}/status")
  @Middlewares(validate(validationSchema.candidateStatusPutSchema))
  public async updateStatus(
    @Path() id: string,
    @Body() body: { status: "Applied" | "Technical Round" | "Offered" }
  ): Promise<{ data?: ICandidateResponse; error?: string }> {
    try {
      const [updatedCandidate, error, httpStatus] = await candidateRepo.updateStatus(id, body.status);

      if (error) {
        this.setStatus(httpStatus);
        return { error: error.message };
      }
      this.setStatus(httpStatus);
      return { data: updatedCandidate || undefined };
    } catch (error) {
      this.setStatus(HttpStatus.HTTP_INTERNAL_SERVER_ERROR);
      logError(error);
      return { error: error as string };
    }
  }

  @Delete("{id}")
  public async deleteCandidate(
    @Path() id: string
  ): Promise<{ data?: ICandidateResponse; error?: string }> {
    try {
      const [candidate, error, httpStatus] = await candidateRepo.deleteCandidate(id);
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
}
