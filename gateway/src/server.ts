import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
// import campaignRoute from './http/routes/campaign.route';
// import usersRoute from './http/routes/user.route';
// import messageRoute from './http/routes/message.route';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import { errorHandler } from './http/middlewares/error.middleware';

class Server {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.routes();

    // //This should be on middlewares but for some reason it's not working when it's there
    // this.app.use(errorHandler);
  }

  private middlewares() {
    const corsOptions = {
      origin: true,
      credentials: true,
    };
    // this.app.use(cors(corsOptions));
    // this.app.use(bodyParser.json());
    // this.app.use(cookieParser());
  }

  private routes() {
    // this.app.use('/api', campaignRoute);
    // this.app.use('/api', usersRoute);
    // this.app.use('/api', messageRoute);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on http://localhost:${this.port}`);
    });
  }
}

export default Server;