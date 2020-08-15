import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSuppliersService from '@modules/appointments/services/ListSuppliersService';
import { classToClass } from 'class-transformer';

export default class SuppliersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listSupplier = container.resolve(ListSuppliersService);

    const suppliers = await listSupplier.execute({
      user_id,
    });

    return res.json(classToClass(suppliers));
  }
}
