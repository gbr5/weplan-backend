import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSupplierDayAvailabilityService from '@modules/appointments/services/ListSupplierDayAvailabilityService';
import { classToClass } from 'class-transformer';

export default class SupplierDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { supplier_id } = req.params;
    const { day, month, year } = req.query;

    const listSupplierDayAvailability = container.resolve(
      ListSupplierDayAvailabilityService,
    );

    const availability = await listSupplierDayAvailability.execute({
      supplier_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(classToClass(availability));
  }
}
