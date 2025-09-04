// utils/redisClient.js
require("dotenv").config();
const redis = require("redis");

const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = process.env;

const client = redis.createClient({
  //redis://:mypassword@redis:6379
  //"redis://myuser:mypassword@redis:6379",
  url: `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
});
client.on("error", (err) => console.log("Redis Client Error", err));

// Connect to Redis (ensure it's asynchronous if needed in your app's context)
(async () => {
  await client.connect();
})();

module.exports = client;
