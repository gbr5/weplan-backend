import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import DeleteAppointmentService from '@modules/appointments/services/DeleteAppointmentService';
import ListAllUserAppointmentsService from '@modules/appointments/services/ListAllUserAppointmentsService';
import UpdateAppointmentService from '@modules/appointments/services/UpdateAppointmentService';

import { classToClass } from 'class-transformer';
import ShowAppointmentService from '@modules/appointments/services/ShowAppointmentService';

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
    const user_id = req.user.id;

    const listAppointments = container.resolve(ListAllUserAppointmentsService);

    const appointments = await listAppointments.execute(user_id);

    return res.json(classToClass(appointments));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const showAppointment = container.resolve(ShowAppointmentService);

    const appointments = await showAppointment.execute(id);

    return res.json(classToClass(appointments));
  }
}
