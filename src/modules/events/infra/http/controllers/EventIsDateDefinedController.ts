import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateEventIsDateDefinedService from '@modules/events/services/UpdateEventIsDateDefinededService';

export default class EventIsDateDefinedController {
  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;
    const { date, isDateDefined } = req.body;

    const updateEventIsDateDefinedService = container.resolve(
      UpdateEventIsDateDefinedService,
    );

    const event = await updateEventIsDateDefinedService.execute({
      event_id,
      date,
      isDateDefined,
    });

    return res.json(classToClass(event));
  }
}
