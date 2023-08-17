import { createClient } from "redis";

export enum AVAILABLE_CHANNELS {
  PERSON_CREATED = "PERSON_CREATED",
  PERSON_UPDATED = "PERSON_UPDATED",
  PERSON_DELETED = "PERSON_DELETED",
}

class Listener {
  public static client = createClient();

  public static async connect() {
    await this.client.connect();
    console.log("Connected to Redis");
  }

  public static async subscribe(
    channel: string,
    usecase: (message: string) => void
  ) {
    await this.client.subscribe(channel, usecase);
  }
}

export default Listener;
