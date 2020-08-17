import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupplierNonUserAppointmentService from '@modules/appointments/services/CreateSupplierNonUserAppointmentService';

import { classToClass } from 'class-transformer';

export default class SupplierNonUserAppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      subject,
      date,
      address,
      appointment_type,
      name,
      email,
      phone,
      description,
      duration_minutes,
    } = req.body;
    const host_id = req.user.id;

    const weplanGuest = false;
    const createSupplierNonUserAppointment = container.resolve(
      CreateSupplierNonUserAppointmentService,
    );

    const appointment = await createSupplierNonUserAppointment.execute({
      subject,
      duration_minutes,
      address,
      date,
      host_id,
      appointment_type,
      weplanGuest,
      name,
      email,
      phone,
      description,
    });

    return res.json(classToClass(appointment));
  }
}
