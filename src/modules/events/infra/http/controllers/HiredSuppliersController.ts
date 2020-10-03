import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListHiredSuppliersService from '@modules/events/services/ListHiredSuppliersService';

export default class EventSuppliersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;

    const listHiredSuppliers = container.resolve(ListHiredSuppliersService);

    const hiredSuppliers = await listHiredSuppliers.execute(event_id);

    return res.json(hiredSuppliers);
  }
}
