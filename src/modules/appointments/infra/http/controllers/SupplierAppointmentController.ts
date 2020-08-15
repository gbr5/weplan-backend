import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSupplierAppointmentService from '@modules/appointments/services/ListSupplierAppointmentService';
import { classToClass } from 'class-transformer';

export default class SupplierAppointmentController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.query;
    const supplier_id = req.user.id;

    const listAppointment = container.resolve(ListSupplierAppointmentService);

    const appointments = await listAppointment.execute({
      supplier_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(classToClass(appointments));
  }
}
