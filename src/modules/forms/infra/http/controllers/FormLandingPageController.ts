import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFormLandingPageService from '@modules/forms/services/CreateFormLandingPageService';
import UpdateFormLandingPageService from '@modules/forms/services/UpdateFormLandingPageService';
import DeleteFormLandingPageService from '@modules/forms/services/DeleteFormLandingPageService';

export default class FormLandingPageController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { form_id, url, isActive } = req.body;
    const createFormLandingPage = container.resolve(
      CreateFormLandingPageService,
    );

    const form = await createFormLandingPage.execute({
      form_id,
      url,
      isActive,
    });

    return res.json(form);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const { url, isActive } = req.body;
    const updateFormLandingPage = container.resolve(
      UpdateFormLandingPageService,
    );

    const form = await updateFormLandingPage.execute({
      id,
      url,
      isActive,
    });

    return res.json(form);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const showFormLandingPage = container.resolve(DeleteFormLandingPageService);

    await showFormLandingPage.execute(id);

    return res.status(200).send();
  }
}
