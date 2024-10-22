import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWeplanUsersAppointmentService from '@modules/appointments/services/CreateWeplanUsersAppointmentService';

import { classToClass } from 'class-transformer';

export default class WeplanUsersAppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      subject,
      date,
      address,
      appointment_type,
      guests,
      duration_minutes,
    } = req.body;
    const host_id = req.user.id;

    const weplanGuest = true;
    const createWeplanUsersAppointment = container.resolve(
      CreateWeplanUsersAppointmentService,
    );

    const appointment = await createWeplanUsersAppointment.execute({
      subject,
      duration_minutes,
      address,
      date,
      host_id,
      appointment_type,
      weplanGuest,
      guests,
    });

    return res.json(classToClass(appointment));
  }
}
