import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import DeleteAppointmentService from '@modules/appointments/services/DeleteAppointmentService';

import { classToClass } from 'class-transformer';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { subject, address, appointment_type, date } = req.body;
    const host_id = req.user.id;

    const createAppointment = container.resolve(CreateAppointmentService);

    const weplanGuest = true;
    const appointment = await createAppointment.execute({
      subject,
      address,
      date,
      host_id,
      appointment_type,
      weplanGuest,
    });

    return res.json(classToClass(appointment));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteAppointmentService = container.resolve(
      DeleteAppointmentService,
    );

    const appointment = await deleteAppointmentService.execute(id);

    return res.json(classToClass(appointment));
  }
}
