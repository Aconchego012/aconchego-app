import Redis from "ioredis";

export enum MESSAGES_TO_PUBLISH {
  PERSON_CREATED = "PERSON_CREATED",
  PERSON_UPDATED = "PERSON_UPDATED",
}

export enum MESSAGES_TO_LISTEN {
  CREATE_PERSON = "CREATE_PERSON",
}

const CHANNEL = "backend";

class RedisServer {
  private publisher: Redis;
  private subscriber: Redis;
  private registeredMessages: {
    message: MESSAGES_TO_LISTEN;
    action: () => Promise<void>;
  }[] = [];

  constructor() {
    const redisConfig = {
      port: Number(process.env.REDIS_PORT) || 6379,
      host: process.env.REDIS_HOST || "localhost",
      family: 4,
      password: process.env.REDIS_PASSWORD || "",
      db: 0,
    };

    this.publisher = new Redis(redisConfig);
    this.subscriber = new Redis(redisConfig);

    this.subscriber.subscribe(CHANNEL, (err: any, count: any) => {
      if (err) {
        console.error("Error subscribing to channels", err);
      }
      console.log(`Subscribed to ${count} channels`);
    });

    this.subscriber.on("message", (channel: any, message: any) => {
      console.log(`Received the following message from ${channel}: ${message}`);
      const receivedMessage = this.registeredMessages.find(
        (receivedMessage) => receivedMessage.message === message
      );
      if (!receivedMessage)
        return console.log(`No message found for message ${message}`);

      receivedMessage.action();
    });
  }

  public registerNewMessage(message: MESSAGES_TO_LISTEN, action: any) {
    if (
      this.registeredMessages.find(
        (registeredMessage) => registeredMessage.message === message
      )
    ) {
      throw new Error(`Message ${message} already registered`);
    }

    this.registeredMessages.push({ message, action });
  }

  public publishMessage(channel = CHANNEL, message: MESSAGES_TO_PUBLISH) {
    this.publisher.publish(channel, message);
  }
}

export default RedisServer;
