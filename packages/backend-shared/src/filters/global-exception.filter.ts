import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

type ErrorResponse = {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
  requestId?: string;
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const hostType = host.getType();

    if (hostType !== 'http') {
      throw exception;
    }

    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const parsed = this.parseException(exception);
    const requestId = this.getRequestId(req);

    const publicError = status >= 500 ? 'InternalServerError' : parsed.error;
    const clientMessage =
      status >= 500 ? 'Internal server error' : parsed.message;

    this.logException(req, status, parsed, exception, requestId);

    const body: ErrorResponse = {
      statusCode: status,
      message: clientMessage,
      error: publicError,
      timestamp: new Date().toISOString(),
      path: req.originalUrl ?? req.url,
      requestId,
    };

    res.status(status).json(body);
  }

  private logException(
    req: Request,
    status: number,
    parsed: { message: string | string[]; error: string },
    exception: unknown,
    requestId?: string,
  ) {
    const payload: Record<string, unknown> = {
      statusCode: status,
      requestId,
    };

    if (exception instanceof Error) {
      payload.err = exception;
    } else {
      payload.message = parsed.message;
      payload.error = parsed.error;
    }

    const logMessage = `${req.method} ${req.url} → ${status} ${parsed.error}`;
    const log =
      status >= 500
        ? this.logger.error.bind(this.logger)
        : this.logger.warn.bind(this.logger);
    log(payload, logMessage);
  }

  private getRequestId(req: Request): string | undefined {
    const requestWithId = req as Request & { id?: string };

    return requestWithId.id ?? req.headers['x-request-id']?.toString();
  }

  private parseException(exception: unknown): {
    message: string | string[];
    error: string;
  } {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      if (typeof response === 'string') {
        return {
          message: response,
          error: exception.name,
        };
      }

      if (typeof response === 'object' && response !== null) {
        const body = response as Record<string, unknown>;

        return {
          message:
            typeof body.message === 'string' || Array.isArray(body.message)
              ? body.message
              : exception.message || 'Unexpected error',
          error: typeof body.error === 'string' ? body.error : exception.name,
        };
      }
    }

    if (exception instanceof Error) {
      return {
        message: exception.message || 'Unexpected error',
        error: exception.name,
      };
    }

    return {
      message: 'Unexpected error',
      error: 'InternalServerError',
    };
  }
}
