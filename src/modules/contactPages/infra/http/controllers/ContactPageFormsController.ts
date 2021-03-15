import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContactPageFormService from '@modules/contactPages/services/CreateContactPageFormService';
import UpdateContactPageFormService from '@modules/contactPages/services/UpdateContactPageFormService';
import DeleteContactPageFormService from '@modules/contactPages/services/DeleteContactPageFormService';

export default class ContactPageFormsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { contact_page_id, form_id, isActive } = req.body;

    const createContactPageForms = container.resolve(
      CreateContactPageFormService,
    );

    const post = await createContactPageForms.execute({
      user_id,
      contact_page_id,
      form_id,
      isActive,
    });

    return res.json(post);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const dataParams = req.params;
    const { id } = dataParams;
    const { isActive } = req.body;

    const updateContactPageForms = container.resolve(
      UpdateContactPageFormService,
    );

    const post = await updateContactPageForms.execute({
      id,
      user_id,
      isActive,
    });

    return res.json(post);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const dataParams = req.params;
    const { id } = dataParams;
    const deleteContactPageForms = container.resolve(
      DeleteContactPageFormService,
    );

    await deleteContactPageForms.execute(id, user_id);

    return res.status(200).send();
  }
}
