import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventWeplanSupplierService from '@modules/events/services/CreateEventWeplanSupplierService';
import ListEventWeplanSuppliersService from '@modules/events/services/ListEventWeplanSuppliersService';

export default class EventWeplanSuppliersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { event_supplier_id, user_id } = req.body;
    const reqParams = req.params;
    const { event_id } = reqParams;

    const my_id = req.user.id;

    const createEventWeplanSupplier = container.resolve(
      CreateEventWeplanSupplierService,
    );

    const eventWeplanSupplier = await createEventWeplanSupplier.execute({
      event_supplier_id,
      event_id,
      user_id,
      my_id,
    });

    return res.json(classToClass(eventWeplanSupplier));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;

    const listEventWeplanSuppliers = container.resolve(
      ListEventWeplanSuppliersService,
    );

    const eventWeplanSuppliers = await listEventWeplanSuppliers.execute(
      event_id,
    );

    return res.json(classToClass(eventWeplanSuppliers));
  }
}
