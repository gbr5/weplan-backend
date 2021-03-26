import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowUserExternalContactPageService from '@modules/contactPages/services/ShowUserExternalContactPageService';

export default class UserExternalContactPagesController {
  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { name, slug } = dataParams;

    const showUserExternalContactPage = container.resolve(
      ShowUserExternalContactPageService,
    );

    const contactPage = await showUserExternalContactPage.execute({
      slug,
      name,
    });

    return res.json(classToClass(contactPage));
  }
}
