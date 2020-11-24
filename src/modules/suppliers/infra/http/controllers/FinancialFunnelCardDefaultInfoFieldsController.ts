import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFinancialFunnelCardDefaultInfoFieldsService from '@modules/suppliers/services/CreateFinancialFunnelCardDefaultInfoFieldsService';

export default class FinancialFunnelCardDefaultInfoFieldsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_id, funnel_id } = req.body;
    console.log(company_id, funnel_id);

    const createFinancialFunnelCardDefaultInfoFields = container.resolve(
      CreateFinancialFunnelCardDefaultInfoFieldsService,
    );

    const FinancialFunnelCardDefaultInfoFields = await createFinancialFunnelCardDefaultInfoFields.execute(
      {
        company_id,
        funnel_id,
      },
    );

    return res.json(classToClass(FinancialFunnelCardDefaultInfoFields));
  }
}
