import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSupplierMonthlyAvailabilityService from '@modules/appointments/services/ListSupplierMonthlyAvailabilityService';
import { classToClass } from 'class-transformer';

export default class SupplierMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const supplier_id = req.params.id;
    const { month, year } = req.query;

    const listSupplierMonthAvailability = container.resolve(
      ListSupplierMonthlyAvailabilityService,
    );

    const availability = await listSupplierMonthAvailability.execute({
      supplier_id,
      month: Number(month),
      year: Number(year),
    });

    return res.json(classToClass(availability));
  }
}
