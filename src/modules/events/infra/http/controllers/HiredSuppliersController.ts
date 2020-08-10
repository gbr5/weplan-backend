import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSelectedSuppliersIsHiredService from '@modules/events/services/ListSelectedSuppliersIsHiredService';
import AppError from '@shared/errors/AppError';

export default class HiredSuppliersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const listSelectedSuppliersIsHired = container.resolve(
      ListSelectedSuppliersIsHiredService,
    );

    const isHired = true;

    const selectedSuppliers = await listSelectedSuppliersIsHired.execute({
      event_name: dataParams.event_name,
      isHired,
    });

    return res.json(selectedSuppliers);
  }
}
