import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateEventIsPublishedService from '@modules/events/services/UpdateEventIsPublishedService';

export default class EventIsPublishedController {
  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;

    const updateEventIsPublishedService = container.resolve(
      UpdateEventIsPublishedService,
    );

    const event = await updateEventIsPublishedService.execute(event_id);

    return res.json(classToClass(event));
  }
}
