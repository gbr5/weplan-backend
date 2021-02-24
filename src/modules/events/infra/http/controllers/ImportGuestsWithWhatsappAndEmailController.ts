import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ImportGuestsWithWhatsappAndEmailService from '@modules/events/services/ImportGuestsWithWhatsappAndEmailService';

export default class ImportGuestsWithWhatsappAndEmailWithWhatsappAndEmailController {
  public async import(req: Request, res: Response): Promise<Response> {
    const host_id = req.user.id;
    const fileguestListFileName = req.file.path;
    const dataParams = req.params;
    const { event_id, number_of_guests_available } = dataParams;

    const importGuests = container.resolve(
      ImportGuestsWithWhatsappAndEmailService,
    );

    const guests = await importGuests.execute(
      fileguestListFileName,
      event_id,
      host_id,
      Number(number_of_guests_available),
    );

    return res.json(classToClass(guests));
  }
}
