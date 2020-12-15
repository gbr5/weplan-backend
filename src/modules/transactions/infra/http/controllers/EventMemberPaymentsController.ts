import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventMemberPaymentService from '@modules/transactions/services/CreateEventMemberPaymentService';
import UpdateEventMemberPaymentsService from '@modules/transactions/services/UpdateEventMemberPaymentService';
import DeleteEventMemberPaymentService from '@modules/transactions/services/DeleteEventMemberPaymentService';
import ListEventMemberPaymentsService from '@modules/transactions/services/ListEventMemberPaymentsService';
import ListEventMemberPaymentsByEventService from '@modules/transactions/services/ListEventMemberPaymentsByEventService';

export default class EventMemberPaymentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      event_id,
      event_member_id,
      value,
      due_date,
      isPaid,
      description,
    } = req.body;

    const createEventMemberPayments = container.resolve(
      CreateEventMemberPaymentService,
    );

    const checkList = await createEventMemberPayments.execute({
      event_id,
      event_member_id,
      value,
      due_date,
      isPaid,
      description,
    });

    return res.json(classToClass(checkList));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const { value, due_date, isPaid, description } = req.body;

    const updateEventMemberPayments = container.resolve(
      UpdateEventMemberPaymentsService,
    );

    const checkList = await updateEventMemberPayments.execute({
      id,
      value,
      due_date,
      isPaid,
      description,
    });

    return res.json(classToClass(checkList));
  }

  public async listByMember(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { event_member_id } = reqParams;

    const listEventMemberPayments = container.resolve(
      ListEventMemberPaymentsService,
    );

    const eventMemberPayments = await listEventMemberPayments.execute(
      event_member_id,
    );

    return res.json(classToClass(eventMemberPayments));
  }

  public async listByEvent(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { event_id } = reqParams;

    const listEventMemberPaymentsByEvent = container.resolve(
      ListEventMemberPaymentsByEventService,
    );

    const eventMemberPayments = await listEventMemberPaymentsByEvent.execute(
      event_id,
    );

    return res.json(classToClass(eventMemberPayments));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteEventMemberPaymentService = container.resolve(
      DeleteEventMemberPaymentService,
    );

    const eventAppointment = await deleteEventMemberPaymentService.execute(id);

    return res.json(classToClass(eventAppointment));
  }
}
