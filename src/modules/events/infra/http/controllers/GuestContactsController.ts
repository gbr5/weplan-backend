import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateGuestContactsService from '@modules/events/services/CreateGuestContactService';
import UpdateGuestContactService from '@modules/events/services/UpdateGuestContactService';
import ListGuestContactsService from '@modules/events/services/ListGuestContactsService';
import DeleteGuestContactService from '@modules/events/services/DeleteGuestContactService';

export default class GuestContactsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { contact_info, contact_type, guest_id } = req.body;

    const createGuestContacts = container.resolve(CreateGuestContactsService);

    const guestContact = await createGuestContacts.execute({
      contact_info,
      contact_type,
      guest_id,
    });

    return res.json(classToClass(guestContact));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { guest_id } = dataParams;

    const listGuestContacts = container.resolve(ListGuestContactsService);

    const guestContacts = await listGuestContacts.execute(guest_id);

    return res.json(classToClass(guestContacts));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const { contact_info } = req.body;
    const updateGuestContact = container.resolve(UpdateGuestContactService);

    const event = await updateGuestContact.execute({
      id,
      contact_info,
    });

    return res.json(event);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteGuestContact = container.resolve(DeleteGuestContactService);

    await deleteGuestContact.execute(id);

    return res.status(200).send();
  }
}
