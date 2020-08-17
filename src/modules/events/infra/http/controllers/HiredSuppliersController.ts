import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListSelectedSuppliersIsHiredService from '@modules/events/services/ListSelectedSuppliersIsHiredService';

export default class HiredSuppliersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const listSelectedSuppliersIsHired = container.resolve(
      ListSelectedSuppliersIsHiredService,
    );

    const isHired = true;

    const selectedSuppliers = await listSelectedSuppliersIsHired.execute({
      event_id: dataParams.event_id,
      isHired,
    });

    return res.json(classToClass(selectedSuppliers));
  }
}
