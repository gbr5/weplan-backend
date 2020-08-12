import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEventPlannerService from '@modules/events/services/CreateEventPlannerService';
import ListEventPlannersService from '@modules/events/services/ListEventPlannersService';
import DeleteEventPlannerService from '@modules/events/services/DeleteEventPlannerService';

export default class EventPlannersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { planner_id } = req.body;
    const user_id = req.user.id;

    const dataParams = req.params;

    const { event_name } = dataParams;

    const createEventPlanners = container.resolve(CreateEventPlannerService);

    const planner = await createEventPlanners.execute({
      user_id,
      event_name,
      planner_id,
    });

    return res.json(planner);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_name } = dataParams;

    const listEventPlanners = container.resolve(ListEventPlannersService);

    const planners = await listEventPlanners.execute(event_name);

    return res.json(planners);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { event_name, planner_id } = dataParams;

    const deleteEventPlanner = container.resolve(DeleteEventPlannerService);

    await deleteEventPlanner.execute({
      event_name,
      planner_id,
    });

    return res.status(200).send();
  }
}
