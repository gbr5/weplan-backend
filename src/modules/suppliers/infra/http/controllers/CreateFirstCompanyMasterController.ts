import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFirstCompanyMasterService from '@modules/suppliers/services/CreateFirstCompanyMasterService';

export default class CreateFirstCompanyMasterController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      companyEmail,
      user_id,
      email,
      name,
      family_name,
      password,
    } = req.body;

    const createCompanyMaster = container.resolve(
      CreateFirstCompanyMasterService,
    );

    const user = await createCompanyMaster.execute({
      user_id,
      companyEmail,
      email,
      password,
      name,
      family_name,
    });

    return res.json(classToClass(user));
  }
}
