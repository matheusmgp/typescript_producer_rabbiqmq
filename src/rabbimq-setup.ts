import client, { Connection, Channel, ConsumeMessage } from "amqplib";

export class SetupRabbitMq {
  constructor() {}

  private consumer: any;
  private producer: any;
  private connection: Connection;
  private channel: Channel;
  private QUEUE: string = "pedidos";

  public async init(): Promise<void> {
    await this.getConnection();
    await this.createChannel();
    await this.channel.assertQueue(this.QUEUE);
  }

  public sendMessage(payload: any): void {
    const message = JSON.stringify(payload);
    this.channel.sendToQueue(this.QUEUE, Buffer.from(Buffer.from(message)));
  }
  private async getConnection() {
    this.connection = await client.connect(
      `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
    );
  }
  private async createChannel() {
    this.channel = await this.connection.createChannel();
  }

  private setConsumer() {
    this.consumer =
      (channel: Channel) =>
      (msg: ConsumeMessage | null): void => {
        if (msg) {
          console.log(msg.content.toString());
          this.channel.ack(msg);
        }
      };
  }
}
