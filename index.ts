import * as dotenv from "dotenv";
import {resolve} from "path";
import mongoose from "mongoose";
import me from "./who-am-i";

import logger from "utils/logger.util";
import {DATABASE} from "constants/common.constants";

import {runServer} from "./src/app";

logger.info("⛷ ⛱ ⛰ ⛳ Start app!!! ⛺ ⛹  ⛸ ⛷");

dotenv.config({path: resolve(__dirname, "../.env")});

logger.info("✅ Dotenv");

me.forEach((status: string) => {
   logger.info(`.. ${status}`);
});

mongoose.connect(
   DATABASE,
   {
      useUnifiedTopology: true,
      useNewUrlParser: true,
   },

   function (err) {
      if (err) {
         logger.info("❌ DB connection unsuccessful!", err);
         return;
      }
      logger.info("✅ DB connection successful!");
      runServer();
   },
);
