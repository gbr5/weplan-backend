import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventSupplierService from '@modules/events/services/CreateEventSupplierService';
import ListEventSuppliersService from '@modules/events/services/ListEventSuppliersService';
import UpdateEventSupplierService from '@modules/events/services/UpdateEventSupplierService';
import DeleteEventSupplierService from '@modules/events/services/DeleteEventSupplierService';

export default class EventSuppliersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, supplier_sub_category, isHired, weplanUser } = req.body;
    const reqParams = req.params;
    const { event_id } = reqParams;
    const user_id = req.user.id;

    const createEventSupplier = container.resolve(CreateEventSupplierService);

    const eventSupplier = await createEventSupplier.execute({
      name,
      event_id,
      supplier_sub_category,
      isHired,
      weplanUser,
      user_id,
    });

    return res.json(classToClass(eventSupplier));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;

    const listEventSuppliers = container.resolve(ListEventSuppliersService);

    const eventSuppliers = await listEventSuppliers.execute(event_id);

    return res.json(classToClass(eventSuppliers));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      name,
      supplier_sub_category,
      isHired,
      isDischarged,
      weplanUser,
    } = req.body;

    const dataParams = req.params;
    const { id } = dataParams;

    const updateEventSupplier = container.resolve(UpdateEventSupplierService);

    const eventSupplier = await updateEventSupplier.execute({
      name,
      id,
      supplier_sub_category,
      isHired,
      weplanUser,
      isDischarged,
    });

    return res.json(classToClass(eventSupplier));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteEventSupplier = container.resolve(DeleteEventSupplierService);

    await deleteEventSupplier.execute(id);

    return res.status(200).send();
  }
}
