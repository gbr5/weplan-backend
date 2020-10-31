import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateCompanyLogoService from '@modules/users/services/UpdateCompanyLogoService';

export default class CompanyLogoController {
  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;
    const updateCompanyLogo = container.resolve(UpdateCompanyLogoService);

    const user = await updateCompanyLogo.execute({
      user_id,
      logoFilename: req.file.filename,
    });

    return res.json(classToClass(user));
  }
}
