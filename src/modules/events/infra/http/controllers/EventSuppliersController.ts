import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEventSupplierService from '@modules/events/services/CreateEventSupplierService';
import DeleteEventSupplierService from '@modules/events/services/DeleteEventSupplierService';
import ListEventSuppliersService from '@modules/events/services/ListEventSuppliersService';

export default class EventSupplierController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { supplier_id, event_name } = req.body;

    const createEventSupplier = container.resolve(CreateEventSupplierService);

    const eventSupplier = await createEventSupplier.execute({
      supplier_id,
      event_name,
    });

    return res.json(eventSupplier);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { event_name } = req.params;

    const listEventSuppliers = container.resolve(ListEventSuppliersService);

    const eventSupplier = await listEventSuppliers.execute(event_name);

    return res.json(eventSupplier);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { event_name, supplier_id } = req.params;

    const deleteEventSupplier = container.resolve(DeleteEventSupplierService);

    await deleteEventSupplier.execute({
      event_name,
      supplier_id,
    });

    return res.status(200).send();
  }
}
