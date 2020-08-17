import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSupplierAppointmentsService from '@modules/appointments/services/ListSupplierAppointmentsService';
import { classToClass } from 'class-transformer';

export default class SuppliersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const host_id = req.user.id;

    const listSupplier = container.resolve(ListSupplierAppointmentsService);

    const suppliers = await listSupplier.execute(host_id);

    return res.json(classToClass(suppliers));
  }
}
