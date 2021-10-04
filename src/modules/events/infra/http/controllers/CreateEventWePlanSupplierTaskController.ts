import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventWePlanSupplierTaskService from '@modules/events/services/CreateEventWePlanSupplierTaskService';

export default class CreateEventWePlanSupplierTaskController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const {
      event_id,
      supplier_id,
      title,
      priority,
      status,
      due_date,
    } = req.body;
    const createEventWePlanSupplierTask = container.resolve(
      CreateEventWePlanSupplierTaskService,
    );

    const eventTask = await createEventWePlanSupplierTask.execute({
      event_id,
      title,
      priority,
      status,
      due_date,
      user_id,
      supplier_id,
    });

    return res.json(classToClass(eventTask));
  }
}
