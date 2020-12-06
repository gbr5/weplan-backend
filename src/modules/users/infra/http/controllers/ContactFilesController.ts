import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateContactFileService from '@modules/users/services/CreateContactFileService';
import DeleteContactFileService from '@modules/users/services/DeleteContactFileService';
import ListContactFilesService from '@modules/users/services/ListContactFilesService';

export default class ContactsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { contact_id, file_id } = req.body;

    const createContactFile = container.resolve(CreateContactFileService);

    const user = await createContactFile.execute({
      contact_id,
      file_id,
    });

    return res.json(classToClass(user));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { contact_id } = reqParams;

    const listContactsFile = container.resolve(ListContactFilesService);

    const files = await listContactsFile.execute(contact_id);

    return res.json(classToClass(files));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteContactFile = container.resolve(DeleteContactFileService);

    const file = await deleteContactFile.execute(id);

    return res.json(classToClass(file));
  }
}
