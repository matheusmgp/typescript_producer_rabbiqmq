import express, { Application } from 'express';
export class SetupServer {
  constructor(private port = 3000, private app = express()) {
    this.init();
  }

  public async init(): Promise<void> {
    this.app.use(express.json());
    this.start();
  }
  public start(): void {
    this.app.listen(this.port, () => {
      console.info('rabbitMQ PRODUCER running on port: ' + this.port);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
