/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ScheduleController } from './../src/controller/scheduleController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { InterviewerController } from './../src/controller/interviewerController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CandidateController } from './../src/controller/candidateController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "mongoose.Types.ObjectId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IInterviewerSummary": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"mongoose.Types.ObjectId"}]},
            "name": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IInterviewSlotResponse": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"mongoose.Types.ObjectId"}]},
            "interviewerId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"mongoose.Types.ObjectId"},{"ref":"IInterviewerSummary"}],"required":true},
            "startTime": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}],"required":true},
            "endTime": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}],"required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Scheduled"]},{"dataType":"enum","enums":["Cancelled"]}]},
            "funnelStatus": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Applied"]},{"dataType":"enum","enums":["Technical Round"]},{"dataType":"enum","enums":["Offered"]}]},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICandidateResponse": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"mongoose.Types.ObjectId"}]},
            "name": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Applied"]},{"dataType":"enum","enums":["Technical Round"]},{"dataType":"enum","enums":["Offered"]}],"required":true},
            "interviewSlots": {"dataType":"array","array":{"dataType":"refObject","ref":"IInterviewSlotResponse"},"required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SchedulePostType": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"funnelStatus":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Applied"]},{"dataType":"enum","enums":["Technical Round"]},{"dataType":"enum","enums":["Offered"]}]},"endTime":{"dataType":"string","required":true},"startTime":{"dataType":"string","required":true},"interviewerId":{"dataType":"string","required":true},"candidateId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IInterviewerResponse": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"mongoose.Types.ObjectId"}]},
            "name": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InterviewerCreateType": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CandidateCreateType": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"ignore","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        app.post('/api/schedule',
            ...(fetchMiddlewares<RequestHandler>(ScheduleController)),
            ...(fetchMiddlewares<RequestHandler>(ScheduleController.prototype.scheduleInterview)),

            async function ScheduleController_scheduleInterview(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"SchedulePostType"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ScheduleController();

              await templateService.apiHandler({
                methodName: 'scheduleInterview',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/schedule/:candidateId/:slotId',
            ...(fetchMiddlewares<RequestHandler>(ScheduleController)),
            ...(fetchMiddlewares<RequestHandler>(ScheduleController.prototype.cancelInterview)),

            async function ScheduleController_cancelInterview(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    candidateId: {"in":"path","name":"candidateId","required":true,"dataType":"string"},
                    slotId: {"in":"path","name":"slotId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ScheduleController();

              await templateService.apiHandler({
                methodName: 'cancelInterview',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/schedule/:candidateId/:slotId',
            ...(fetchMiddlewares<RequestHandler>(ScheduleController)),
            ...(fetchMiddlewares<RequestHandler>(ScheduleController.prototype.rescheduleInterview)),

            async function ScheduleController_rescheduleInterview(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    candidateId: {"in":"path","name":"candidateId","required":true,"dataType":"string"},
                    slotId: {"in":"path","name":"slotId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"endTime":{"dataType":"string","required":true},"startTime":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ScheduleController();

              await templateService.apiHandler({
                methodName: 'rescheduleInterview',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/interviewer',
            ...(fetchMiddlewares<RequestHandler>(InterviewerController)),
            ...(fetchMiddlewares<RequestHandler>(InterviewerController.prototype.createInterviewer)),

            async function InterviewerController_createInterviewer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"InterviewerCreateType"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new InterviewerController();

              await templateService.apiHandler({
                methodName: 'createInterviewer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/interviewer',
            ...(fetchMiddlewares<RequestHandler>(InterviewerController)),
            ...(fetchMiddlewares<RequestHandler>(InterviewerController.prototype.getAllInterviewers)),

            async function InterviewerController_getAllInterviewers(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new InterviewerController();

              await templateService.apiHandler({
                methodName: 'getAllInterviewers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/interviewer/:id',
            ...(fetchMiddlewares<RequestHandler>(InterviewerController)),
            ...(fetchMiddlewares<RequestHandler>(InterviewerController.prototype.deleteInterviewer)),

            async function InterviewerController_deleteInterviewer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new InterviewerController();

              await templateService.apiHandler({
                methodName: 'deleteInterviewer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/candidate',
            ...(fetchMiddlewares<RequestHandler>(CandidateController)),
            ...(fetchMiddlewares<RequestHandler>(CandidateController.prototype.createCandidate)),

            async function CandidateController_createCandidate(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"CandidateCreateType"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CandidateController();

              await templateService.apiHandler({
                methodName: 'createCandidate',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/candidate',
            ...(fetchMiddlewares<RequestHandler>(CandidateController)),
            ...(fetchMiddlewares<RequestHandler>(CandidateController.prototype.getAllCandidates)),

            async function CandidateController_getAllCandidates(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CandidateController();

              await templateService.apiHandler({
                methodName: 'getAllCandidates',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/candidate/:id/status',
            ...(fetchMiddlewares<RequestHandler>(CandidateController)),
            ...(fetchMiddlewares<RequestHandler>(CandidateController.prototype.updateStatus)),

            async function CandidateController_updateStatus(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Applied"]},{"dataType":"enum","enums":["Technical Round"]},{"dataType":"enum","enums":["Offered"]}],"required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CandidateController();

              await templateService.apiHandler({
                methodName: 'updateStatus',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/candidate/:id',
            ...(fetchMiddlewares<RequestHandler>(CandidateController)),
            ...(fetchMiddlewares<RequestHandler>(CandidateController.prototype.deleteCandidate)),

            async function CandidateController_deleteCandidate(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CandidateController();

              await templateService.apiHandler({
                methodName: 'deleteCandidate',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
