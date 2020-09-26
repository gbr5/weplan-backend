import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListHiredSuppliersService from '@modules/events/services/ListHiredSuppliersService';

export default class EventSuppliersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;
    console.log('1 hired suppliers controller', event_id);

    const listHiredSuppliers = container.resolve(ListHiredSuppliersService);

    const hiredSuppliers = await listHiredSuppliers.execute(event_id);
    console.log(
      '2 hired suppliers controller',
      event_id,
      'Deu Certo',
      hiredSuppliers,
    );

    return res.json(hiredSuppliers);
  }
}
