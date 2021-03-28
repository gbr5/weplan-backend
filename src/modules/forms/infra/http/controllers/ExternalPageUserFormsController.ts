import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowExternalPageUserFormService from '@modules/forms/services/ShowExternalPageUserFormService';

export default class ExternalPageUserFormsController {
  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const showUserForm = container.resolve(ShowExternalPageUserFormService);

    const form = await showUserForm.execute(id);

    return res.json(classToClass(form));
  }
}
