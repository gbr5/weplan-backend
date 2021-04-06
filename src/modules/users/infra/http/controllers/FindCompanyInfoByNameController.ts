import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowCompanyInfoByNameService from '@modules/users/services/ShowCompanyInfoByNameService';

export default class FindCompanyInfoByNameController {
  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { name } = reqParams;

    const showCompanyInfoByName = container.resolve(
      ShowCompanyInfoByNameService,
    );

    const companyInfo = await showCompanyInfoByName.execute({ name });

    return res.json(classToClass(companyInfo));
  }
}
