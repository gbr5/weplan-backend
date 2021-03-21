import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFormEmailNotificationRecipientService from '@modules/forms/services/CreateFormEmailNotificationRecipientService';
import UpdateFormEmailNotificationRecipientService from '@modules/forms/services/UpdateFormEmailNotificationRecipientService';
import DeleteFormEmailNotificationRecipientService from '@modules/forms/services/DeleteFormEmailNotificationRecipientService';

export default class FormEmailNotificationRecipientsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, email_notification_id, sending_type } = req.body;
    const createFormEmailNotificationRecipients = container.resolve(
      CreateFormEmailNotificationRecipientService,
    );

    const form = await createFormEmailNotificationRecipients.execute({
      email,
      email_notification_id,
      sending_type,
    });

    return res.json(form);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const { email, sending_type } = req.body;
    const updateFormEmailNotificationRecipients = container.resolve(
      UpdateFormEmailNotificationRecipientService,
    );

    const form = await updateFormEmailNotificationRecipients.execute({
      id,
      email,
      sending_type,
    });

    return res.json(form);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const showFormEmailNotificationRecipients = container.resolve(
      DeleteFormEmailNotificationRecipientService,
    );

    await showFormEmailNotificationRecipients.execute(id);

    return res.status(200).send();
  }
}
