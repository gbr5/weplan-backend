import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProductionFunnelCardDefaultInfoFieldsService from '@modules/suppliers/services/CreateProductionFunnelCardDefaultInfoFieldsService';

export default class ProductionFunnelCardDefaultInfoFieldsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_id, funnel_id } = req.body;
    console.log(company_id, funnel_id);

    const createProductionFunnelCardDefaultInfoFields = container.resolve(
      CreateProductionFunnelCardDefaultInfoFieldsService,
    );

    const productionFunnelCardDefaultInfoFields = await createProductionFunnelCardDefaultInfoFields.execute(
      {
        company_id,
        funnel_id,
      },
    );

    return res.json(classToClass(productionFunnelCardDefaultInfoFields));
  }
}
