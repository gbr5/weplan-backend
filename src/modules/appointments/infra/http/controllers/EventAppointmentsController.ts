import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEventAppointmentService from '@modules/appointments/services/CreateEventAppointmentService';
import ListEventAppointmentsService from '@modules/appointments/services/ListEventAppointmentsService';
import DeleteEventAppointmentService from '@modules/appointments/services/DeleteEventAppointmentService';

import { classToClass } from 'class-transformer';

export default class EventAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { event_id } = reqParams;

    const listEventAppointments = container.resolve(
      ListEventAppointmentsService,
    );

    const eventAppointments = await listEventAppointments.execute(event_id);

    return res.json(classToClass(eventAppointments));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { appointment_id, event_id } = req.body;

    const createEventAppointment = container.resolve(
      CreateEventAppointmentService,
    );

    const eventAppointment = await createEventAppointment.execute({
      appointment_id,
      event_id,
    });

    return res.json(classToClass(eventAppointment));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteEventAppointmentService = container.resolve(
      DeleteEventAppointmentService,
    );

    const eventAppointment = await deleteEventAppointmentService.execute(id);

    return res.json(classToClass(eventAppointment));
  }
}
