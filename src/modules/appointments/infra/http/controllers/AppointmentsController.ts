import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import DeleteAppointmentService from '@modules/appointments/services/DeleteAppointmentService';
import ListSupplierAppointmentsService from '@modules/appointments/services/ListSupplierAppointmentsService';
import UpdateAppointmentService from '@modules/appointments/services/UpdateAppointmentService';

import { classToClass } from 'class-transformer';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      subject,
      address,
      appointment_type,
      date,
      duration_minutes,
      weplanGuest,
      guest,
    } = req.body;
    const host_id = req.user.id;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      subject,
      address,
      date,
      host_id,
      appointment_type,
      weplanGuest,
      guest,
      duration_minutes,
    });

    return res.json(classToClass(appointment));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const {
      subject,
      date,
      duration_minutes,
      address,
      appointment_type,
      weplanGuest,
      guest,
    } = req.body;

    const updateAppointmentService = container.resolve(
      UpdateAppointmentService,
    );

    const appointment = await updateAppointmentService.execute(
      id,
      subject,
      date,
      duration_minutes,
      address,
      appointment_type,
      weplanGuest,
      guest,
    );

    return res.json(classToClass(appointment));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteAppointmentService = container.resolve(
      DeleteAppointmentService,
    );

    await deleteAppointmentService.execute(id);

    return res.status(200).send('');
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const host_id = req.user.id;

    const listAppointments = container.resolve(ListSupplierAppointmentsService);

    const appointments = await listAppointments.execute(host_id);

    return res.json(classToClass(appointments));
  }
}
