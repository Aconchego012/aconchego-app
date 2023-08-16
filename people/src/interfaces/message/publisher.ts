import { createClient } from "redis";

export enum AVAILABLE_CHANNELS {
  PERSON_CREATED = "PERSON_CREATED",
  PERSON_UPDATED = "PERSON_UPDATED",
  PERSON_DELETED = "PERSON_DELETED",
}

class Publisher {
  public static client = createClient();

  public static async publish(channel: AVAILABLE_CHANNELS, message: string) {
    await Publisher.client.connect();
    await Publisher.client.publish(channel, message);
    await Publisher.client.disconnect();
  }
}

export default Publisher;
