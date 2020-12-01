import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventServiceOrderService from '@modules/events/services/CreateEventServiceOrderService';

export default class EventServiceOrdersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_service_order_id, event_id } = req.body;

    const createEventServiceOrders = container.resolve(
      CreateEventServiceOrderService,
    );

    const event_service_order = await createEventServiceOrders.execute({
      customer_service_order_id,
      event_id,
    });

    return res.json(classToClass(event_service_order));
  }
}
