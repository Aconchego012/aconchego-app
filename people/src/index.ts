import "dotenv/config";
import RedisServer, { MESSAGES_TO_LISTEN } from "./interfaces/redis";

const redis = new RedisServer();
redis.registerNewMessage(MESSAGES_TO_LISTEN.CREATE_PERSON, async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Async code executed");
      resolve(null);
    }, 2000);
  });
});
console.log("Server has started..");
