import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateComercialFunnelCardDefaultInfoFieldService from '@modules/suppliers/services/CreateComercialFunnelCardDefaultInfoFieldService';

export default class ComercialFunnelCardDefaultInfoFieldsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_id, funnel_id } = req.body;

    const createComercialFunnelCardDefaultInfoField = container.resolve(
      CreateComercialFunnelCardDefaultInfoFieldService,
    );

    const comercialFunnelCardDefaultInfoFields = await createComercialFunnelCardDefaultInfoField.execute(
      {
        company_id,
        funnel_id,
      },
    );

    return res.json(classToClass(comercialFunnelCardDefaultInfoFields));
  }
}
