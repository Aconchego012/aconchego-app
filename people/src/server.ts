import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import router from "./interfaces/http/router";
import bodyParser from "body-parser";

class Server {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    const corsOptions = {
      origin: true,
      credentials: true,
    };
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.json());
  }

  private routes() {
    this.app.use("/api", router);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on http://localhost:${this.port}`);
    });
  }
}

export default Server;
