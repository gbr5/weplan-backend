import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFormSuccessMessageService from '@modules/forms/services/CreateFormSuccessMessageService';
import UpdateFormSuccessMessageService from '@modules/forms/services/UpdateFormSuccessMessageService';
import DeleteFormSuccessMessageService from '@modules/forms/services/DeleteFormSuccessMessageService';

export default class FormSuccessMessageController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { message, form_id, title } = req.body;
    const createFormSuccessMessage = container.resolve(
      CreateFormSuccessMessageService,
    );

    const form = await createFormSuccessMessage.execute({
      message,
      form_id,
      title,
    });

    return res.json(form);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const { message, title } = req.body;
    const updateFormSuccessMessage = container.resolve(
      UpdateFormSuccessMessageService,
    );

    const form = await updateFormSuccessMessage.execute({
      id,
      message,
      title,
    });

    return res.json(form);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const showFormSuccessMessage = container.resolve(
      DeleteFormSuccessMessageService,
    );

    await showFormSuccessMessage.execute(id);

    return res.status(200).send();
  }
}
