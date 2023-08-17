import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import httpProxy from "express-http-proxy";
import { SERVICES } from "./services";

class Server {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.setupProxy();
  }

  private middlewares() {
    const corsOptions = {
      origin: true,
      credentials: true,
    };
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.json());
  }

  private setupProxy() {
    const peopleServiceProxy = httpProxy(SERVICES.PEOPLE_SERVICE);
    this.app.use("/api/people", peopleServiceProxy);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on http://localhost:${this.port}`);
    });
  }
}

export default Server;
