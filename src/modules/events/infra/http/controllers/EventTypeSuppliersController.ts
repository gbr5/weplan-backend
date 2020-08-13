import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEventTypeSupplierService from '@modules/events/services/CreateEventTypeSupplierService';
import ShowEventTypeSupplierService from '@modules/events/services/ShowEventTypeSupplierService';
import ListSuppliersByEventTypeService from '@modules/events/services/ListSuppliersByEventTypeService';
import DeleteEventTypeSupplierService from '@modules/events/services/DeleteEventTypeSupplierService';

export default class EventTypeSupplierController {
  public async create(req: Request, res: Response): Promise<Response> {
    const event_type = req.params;
    const user_id = req.user.id;

    const createEventTypeSupplier = container.resolve(
      CreateEventTypeSupplierService,
    );

    const eventTypeSupplier = await createEventTypeSupplier.execute({
      event_type: event_type.event_type,
      user_id,
    });

    return res.json(eventTypeSupplier);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { event_type } = req.params;
    const listSuppliersByEventTypeService = container.resolve(
      ListSuppliersByEventTypeService,
    );

    const eventTypeSupplier = await listSuppliersByEventTypeService.execute({
      event_type,
    });

    return res.json(eventTypeSupplier);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { event_type, user_id } = req.params;

    const showEventTypeSupplier = container.resolve(
      ShowEventTypeSupplierService,
    );

    const eventTypeSupplier = await showEventTypeSupplier.execute({
      event_type,
      user_id,
    });

    return res.json(eventTypeSupplier);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const event_type = req.params;
    const user_id = req.user.id;

    const deleteEventTypeSupplier = container.resolve(
      DeleteEventTypeSupplierService,
    );

    await deleteEventTypeSupplier.execute({
      user_id,
      event_type: event_type.event_type,
    });

    return res.status(200).send();
  }
}
