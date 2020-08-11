import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContactTypeService from '@modules/users/services/CreateContactTypeService';
import UpdateContactTypeService from '@modules/users/services/UpdateContactTypeService';
import ListContactTypesService from '@modules/users/services/ListContactTypesService';
import DeleteContactTypeService from '@modules/users/services/DeleteContactTypeService';

export default class ContactTypeController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createContactType = container.resolve(CreateContactTypeService);

    const contactType = await createContactType.execute({
      name,
    });

    return res.json(contactType);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listContactTypes = container.resolve(ListContactTypesService);

    const contactTypes = await listContactTypes.execute();

    return res.json(contactTypes);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const dataParams = req.params;
    const { contact_type } = dataParams;

    const updateContactType = container.resolve(UpdateContactTypeService);

    const contactType = await updateContactType.execute({
      name,
      contact_type,
    });

    return res.json(contactType);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { contact_type } = dataParams;

    const deleteContactType = container.resolve(DeleteContactTypeService);

    await deleteContactType.execute({ contact_type });

    return res.status(200).send();
  }
}
