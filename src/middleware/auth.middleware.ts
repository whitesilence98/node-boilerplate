import {AUTH_TOKEN_KEY, SECRET_KEY} from "constants/auth.constants";
import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import jwt, {JwtPayload} from "jsonwebtoken";

import {IUser} from "routers/v1/user/user.model";

import logger from "utils/logger.util";

const getcookie = (req: Request) => {
   if (req.cookies) return req.cookies;
   return;
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
   const token = req.headers["authorization"];

   if (!token) {
      logger.error(`❌ Unauthorized | 401 ${req.originalUrl}`);
      return res.status(StatusCodes.UNAUTHORIZED).end();
   }

   try {
      // Verify the token using jwt.verify method
      jwt.verify(token, SECRET_KEY);
   } catch (_) {
      logger.error(`❌ Forbidden | 403 ${req.originalUrl}`);
      return res.status(StatusCodes.FORBIDDEN).end();
   }
   return next();
};

export const authentication = (req: Request, res: Response, next: NextFunction) => {
   // const token = req.cookies[AUTH_TOKEN_KEY];
   const token = getcookie(req);
   logger.info(req.cookies);
   logger.info(token);
   if (!token) {
      logger.error(`❌ Unauthorized | 401 ${req.originalUrl}`);
      return res.status(StatusCodes.UNAUTHORIZED).end();
   }

   try {
      // const data = jwt.verify(token, SECRET_KEY);
      // logger.info(data);
   } catch (_) {
      logger.error(`❌ Forbidden | 403 ${req.originalUrl}`);
      return res.status(StatusCodes.FORBIDDEN).end();
   }
   return res.json({cookie: req.cookies});
};

export const authorization = (req: Request, res: Response, next: NextFunction) => {
   const token = req.headers["authorization"];
   // const token = getcookie(req);
   if (!token) {
      logger.error(`❌ Unauthorized | 401 ${req.originalUrl}`);
      return res.status(StatusCodes.FORBIDDEN).end();
   }

   try {
      const data: any = jwt.verify(token, SECRET_KEY);
      if (data.userRole === "Admin") return next();
      return res.status(StatusCodes.UNAUTHORIZED).end();
   } catch {
      logger.error(`❌ Forbidden | 403 ${req.originalUrl}`);
      return res.status(StatusCodes.FORBIDDEN).end();
   }
};

export default verifyToken;
