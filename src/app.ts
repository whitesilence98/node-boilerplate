import express from "express";
import api from "routers";

import cors from "cors";

import logger from "utils/logger.util";

import loggerMiddleware from "middleware/logger.middleware";

import {errorHandlerMiddleware} from "middleware/error.middleware";

const SERVER_PORT = 3001;

const app = express();

export const runServer = () => {
   // parse application/json
   app.use(express.json());
   app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

   //cors
   app.use(cors({origin: "http://localhost:4000"}));
   // middleware
   app.use(loggerMiddleware);

   //api
   app.use("/api", api);

   //error
   app.use(errorHandlerMiddleware);

   // app.listen(process.env.SERVER_PORT, () => {
   //    logger.info(`✅ Server is running at http://localhost:${process.env.SERVER_PORT}`);
   // });
   app.listen(SERVER_PORT, () => {
      logger.info(`✅ Server is running at http://localhost:${SERVER_PORT}}`);
   });
};
