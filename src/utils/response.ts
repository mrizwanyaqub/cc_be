import { Response } from "express";
import * as httpStatus from "http-status";

function data(code: number, success: boolean, message: string) {
  return {
    code,
    success,
    message
  };
}

export function sendRecordCreatedResponse(res: Response, data: any) {
  return res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, success: true, data });
}

export function sendDataResponse(res: Response, data: any) {
  return res.status(httpStatus.OK).json({ code: httpStatus.OK, success: true, data });
}

export function sendNotFoundResponse(res: Response, message: string) {
  return res.status(httpStatus.NOT_FOUND).json(data(httpStatus.NOT_FOUND, false, message));
}

export function sendBadRequestResponse(res: Response, message: string) {
  return res.status(httpStatus.BAD_REQUEST).json(data(httpStatus.BAD_REQUEST, false, message));
}

export function sendUnauthorizeResponse(res: Response, message: string) {
  return res.status(httpStatus.UNAUTHORIZED).json(data(httpStatus.UNAUTHORIZED, false, message));
}

export function sendConflictResponse(res: Response, message: string) {
  return res.status(httpStatus.CONFLICT).json(data(httpStatus.CONFLICT, false, message));
}

export function sendInternalErrorResponse(res: Response) {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(data(httpStatus.INTERNAL_SERVER_ERROR, false, "Internal server error, try again later"));
}
