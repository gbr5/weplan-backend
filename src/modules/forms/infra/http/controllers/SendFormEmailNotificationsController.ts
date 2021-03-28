import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import SendFormEmailNotificationsService from '@modules/forms/services/SendFormEmailNotificationsService';

export default class SendFormEmailNotificationsController {
  public async post(req: Request, res: Response): Promise<Response> {
    const { form_id, formResults } = req.body;

    const sendFormEmailNotificationsService = container.resolve(
      SendFormEmailNotificationsService,
    );

    const form = await sendFormEmailNotificationsService.execute({
      form_id,
      formResults,
    });

    return res.json(classToClass(form));
  }
}
