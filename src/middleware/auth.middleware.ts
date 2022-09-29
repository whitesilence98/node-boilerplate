import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";

import logger from "utils/logger.util";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
   const token = req.headers["authorization"];

   if (!token) {
      logger.error(`❌ Forbidden | 403 ${req.originalUrl}`);
      return res.status(StatusCodes.FORBIDDEN).end();
   }

   try {
      // Verify the token using jwt.verify method
      jwt.verify(token, "iloveyou");
   } catch (err: any) {
      return res.status(StatusCodes.FORBIDDEN).end();
   }
   return next();
};

export default verifyToken;
