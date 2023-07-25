import { SetupServer } from './server';
import { SetupRabbitMq } from './rabbimq-setup';
import { Request, Response } from 'express';
import { validationMiddleware } from './middleware/validate.middleware';
import { PeditoDto } from './dtos/pedido.dto';
require('dotenv').config();

(async (): Promise<void> => {
  //starts express server
  const server = new SetupServer(3000);
  server.init();

  //starts rabbitmq config
  const producer = new SetupRabbitMq();
  producer.init();

  server.getApp().post('/pedidos', validationMiddleware(PeditoDto), (req: Request, res: Response) => {
    producer.sendMessage(req.body);
    res.status(200).send({ response: 'data sent to queue' });
  });
})();
