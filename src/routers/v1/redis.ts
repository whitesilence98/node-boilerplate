const redis = require("redis");

const redisClient = redis.createClient(6379);

redisClient.on("connect", function () {
   console.log("Redis: Connected!");
});

redisClient.on("error", (error: string) => {
   console.log("Redis: " + error);
});

module.exports = redisClient;
