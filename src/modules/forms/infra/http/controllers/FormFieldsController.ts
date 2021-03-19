import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFormFieldService from '@modules/forms/services/CreateFormFieldService';
import UpdateFormFieldService from '@modules/forms/services/UpdateFormFieldService';
import DeleteFormFieldService from '@modules/forms/services/DeleteFormFieldService';

export default class FormFieldsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, form_id, placeholder, title, type, isRequired } = req.body;
    const createFormFields = container.resolve(CreateFormFieldService);

    const form = await createFormFields.execute({
      name,
      form_id,
      placeholder,
      title,
      position: 1,
      type,
      isRequired,
    });

    return res.json(form);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const { name, position, placeholder, title, type, isRequired } = req.body;
    const updateFormFields = container.resolve(UpdateFormFieldService);

    const form = await updateFormFields.execute({
      id,
      name,
      position,
      placeholder,
      title,
      type,
      isRequired,
    });

    return res.json(form);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const showFormFields = container.resolve(DeleteFormFieldService);

    await showFormFields.execute(id);

    return res.status(200).send();
  }
}
