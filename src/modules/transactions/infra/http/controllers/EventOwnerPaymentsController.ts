import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventOwnerPaymentService from '@modules/transactions/services/CreateEventOwnerPaymentService';
import UpdateEventOwnerPaymentsService from '@modules/transactions/services/UpdateEventOwnerPaymentService';
import DeleteEventOwnerPaymentService from '@modules/transactions/services/DeleteEventOwnerPaymentService';
import ListEventOwnerPaymentsService from '@modules/transactions/services/ListEventOwnerPaymentsService';
import ListEventOwnerPaymentsByEventService from '@modules/transactions/services/ListEventOwnerPaymentsByEventService';

export default class EventOwnerPaymentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      event_id,
      event_owner_id,
      value,
      due_date,
      isPaid,
      description,
    } = req.body;

    const createEventOwnerPayments = container.resolve(
      CreateEventOwnerPaymentService,
    );

    const eventOwnerPayment = await createEventOwnerPayments.execute({
      event_id,
      event_owner_id,
      value,
      due_date,
      isPaid,
      description,
    });

    return res.json(classToClass(eventOwnerPayment));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const { value, due_date, isPaid, description } = req.body;

    const updateEventOwnerPayments = container.resolve(
      UpdateEventOwnerPaymentsService,
    );

    const eventOwnerPayment = await updateEventOwnerPayments.execute({
      id,
      value,
      due_date,
      isPaid,
      description,
    });

    return res.json(classToClass(eventOwnerPayment));
  }

  public async listByOwner(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { event_owner_id } = reqParams;

    const listEventOwnerPayments = container.resolve(
      ListEventOwnerPaymentsService,
    );

    const eventOwnerPayments = await listEventOwnerPayments.execute(
      event_owner_id,
    );

    return res.json(classToClass(eventOwnerPayments));
  }

  public async listByEvent(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { event_id } = reqParams;

    const listEventOwnerPaymentsByEvent = container.resolve(
      ListEventOwnerPaymentsByEventService,
    );

    const eventOwnerPayments = await listEventOwnerPaymentsByEvent.execute(
      event_id,
    );

    return res.json(classToClass(eventOwnerPayments));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteEventOwnerPaymentService = container.resolve(
      DeleteEventOwnerPaymentService,
    );

    const eventAppointment = await deleteEventOwnerPaymentService.execute(id);

    return res.json(classToClass(eventAppointment));
  }
}
