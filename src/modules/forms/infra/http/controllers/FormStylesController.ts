import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFormStylesService from '@modules/forms/services/CreateFormStylesService';
import UpdateFormStylesService from '@modules/forms/services/UpdateFormStylesService';
import DeleteFormStylesService from '@modules/forms/services/DeleteFormStylesService';

export default class FormStylesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      background_color,
      form_id,
      text_color,
      button_color,
      button_text_color,
    } = req.body;
    const createFormStyles = container.resolve(CreateFormStylesService);

    const form = await createFormStyles.execute({
      background_color,
      form_id,
      text_color,
      button_color,
      button_text_color,
    });

    return res.json(form);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const {
      background_color,
      text_color,
      button_color,
      button_text_color,
    } = req.body;
    const updateFormStyles = container.resolve(UpdateFormStylesService);

    const form = await updateFormStyles.execute({
      id,
      background_color,
      text_color,
      button_color,
      button_text_color,
    });

    return res.json(form);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const showFormStyles = container.resolve(DeleteFormStylesService);

    await showFormStyles.execute(id);

    return res.status(200).send();
  }
}
