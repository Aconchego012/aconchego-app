import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import router from "./interfaces/http/routes/attendance.route";
import bodyParser from "body-parser";
import Listener from "./interfaces/message/listener";
import { createUser } from "./usecases/user.usecase";

class Server {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.routes();
    this.setupSubscribers();
  }

  private middlewares() {
    const corsOptions = {
      origin: true,
      credentials: true,
    };
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.json());
  }

  private setupSubscribers() {
    Listener.connect();
    Listener.subscribe("PERSON_CREATED", createUser);
  }

  private routes() {
    this.app.use(router);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on http://localhost:${this.port}`);
    });
  }
}

export default Server;
