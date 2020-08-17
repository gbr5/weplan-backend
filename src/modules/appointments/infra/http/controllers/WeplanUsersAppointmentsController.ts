import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWeplanUsersAppointmentService from '@modules/appointments/services/CreateWeplanUsersAppointmentService';

import { classToClass } from 'class-transformer';

export default class WeplanUsersAppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { subject, date, address, appointment_type, guest_id } = req.body;
    const host_id = req.user.id;

    const weplanGuest = true;
    const createWeplanUsersAppointment = container.resolve(
      CreateWeplanUsersAppointmentService,
    );

    const appointment = await createWeplanUsersAppointment.execute({
      subject,
      address,
      date,
      host_id,
      appointment_type,
      weplanGuest,
      guest_id,
    });

    return res.json(classToClass(appointment));
  }
}
