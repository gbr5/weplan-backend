import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEventMemberService from '@modules/events/services/CreateEventMemberService';
import ListEventMembersService from '@modules/events/services/ListEventMembersService';
import DeleteEventMemberService from '@modules/events/services/DeleteEventMemberService';

export default class EventMembersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { member_id } = req.body;
    const user_id = req.user.id;

    const dataParams = req.params;

    const { event_name } = dataParams;

    const createEventMembers = container.resolve(CreateEventMemberService);

    const member = await createEventMembers.execute({
      user_id,
      event_name,
      member_id,
    });

    return res.json(member);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_name } = dataParams;

    const listEventMembers = container.resolve(ListEventMembersService);

    const members = await listEventMembers.execute(event_name);

    return res.json(members);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { event_name, member_id } = dataParams;

    const deleteEventMember = container.resolve(DeleteEventMemberService);

    await deleteEventMember.execute({
      event_name,
      member_id,
    });

    return res.status(200).send();
  }
}
