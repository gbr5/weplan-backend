import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFormEmailNotificationService from '@modules/forms/services/CreateFormEmailNotificationService';
import UpdateFormEmailNotificationService from '@modules/forms/services/UpdateFormEmailNotificationService';
import DeleteFormEmailNotificationService from '@modules/forms/services/DeleteFormEmailNotificationService';

export default class FormEmailNotificationsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { subject, form_id, message, notification_type } = req.body;
    const createFormEmailNotifications = container.resolve(
      CreateFormEmailNotificationService,
    );

    const form = await createFormEmailNotifications.execute({
      subject,
      form_id,
      message,
      notification_type,
    });

    return res.json(form);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const { subject, message } = req.body;
    const updateFormEmailNotifications = container.resolve(
      UpdateFormEmailNotificationService,
    );

    const form = await updateFormEmailNotifications.execute({
      id,
      subject,
      message,
    });

    return res.json(form);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const showFormEmailNotifications = container.resolve(
      DeleteFormEmailNotificationService,
    );

    await showFormEmailNotifications.execute(id);

    return res.status(200).send();
  }
}
