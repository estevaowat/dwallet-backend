import { Request, Response } from 'express';

import AppError from '@shared/AppError';

class ErrorHandler {
   public static middlewareError(error: Error, req: Request, res: Response) {
      ErrorHandler.handleError(error, res);
   }

   public static handleError(error: Error, res: Response): void {
      ErrorHandler.crashIfUntrustedErrorOrSendResponse(error, res);
   }

   public static isTrustedError(error: Error): boolean {
      if (error instanceof AppError) {
         return error.getIsOperational();
      }
      return false;
   }

   public static crashIfUntrustedErrorOrSendResponse(
      error: Error,
      response: Response,
   ) {
      if (!ErrorHandler.isTrustedError(error)) {
         process.exit(1);
      }

      if (error instanceof AppError) {
         return response
            .status(500)
            .json({ description: error.getDescription() });
      }

      return response.status(500).json({ message: error.message });
   }
}

export default ErrorHandler;
