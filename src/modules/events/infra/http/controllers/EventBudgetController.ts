import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventBudgetService from '@modules/events/services/CreateEventBudgetService';
import UpdateEventBudgetService from '@modules/events/services/UpdateEventBudgetService';
import ShowEventBudgetService from '@modules/events/services/ShowEventBudgetService';
import DeleteEventBudgetService from '@modules/events/services/DeleteEventBudgetService';

export default class EventBudgetController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { event_id, budget } = req.body;
    const createEventBudget = container.resolve(CreateEventBudgetService);

    const eventBudget = await createEventBudget.execute({
      event_id,
      budget,
    });

    return res.json(eventBudget);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const { budget } = req.body;

    const updateEventBudget = container.resolve(UpdateEventBudgetService);

    const eventBudget = await updateEventBudget.execute({
      budget,
      id,
    });

    return res.json(classToClass(eventBudget));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;

    const showEventBudgetService = container.resolve(ShowEventBudgetService);

    const eventBudget = await showEventBudgetService.execute(event_id);

    return res.json(classToClass(eventBudget));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const deleteEventBudget = container.resolve(DeleteEventBudgetService);

    await deleteEventBudget.execute(id);

    return res.status(200).send();
  }
}
