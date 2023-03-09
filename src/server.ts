import express, { Application, Request, Response } from "express";
import { SetupRabbitMq } from "./rabbimq-setup";
export class SetupServer {
  constructor(private port = 3000, private app = express()) {}

  public async init(): Promise<void> {
    this.app.use(express.json());
    this.start();
  }
  public start(): void {
    this.app.listen(this.port, () => {
      console.info("rabbitMQ CONSUMER running on port: " + this.port);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
