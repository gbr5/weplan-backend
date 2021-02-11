import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentReminderService from '@modules/appointments/services/CreateAppointmentReminderService';
import UpdateAppointmentRemindersService from '@modules/appointments/services/UpdateAppointmentReminderService';
import DeleteAppointmentReminderService from '@modules/appointments/services/DeleteAppointmentReminderService';

export default class AppointmentRemindersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { date, reminder_type, appointment_id } = req.body;

    const createAppointmentReminder = container.resolve(
      CreateAppointmentReminderService,
    );

    const appointmentReminder = await createAppointmentReminder.execute({
      date,
      reminder_type,
      appointment_id,
    });

    return res.json(appointmentReminder);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const { date, reminder_type } = req.body;

    const updateAppointmentReminders = container.resolve(
      UpdateAppointmentRemindersService,
    );

    const appointmentReminder = await updateAppointmentReminders.execute(
      id,
      date,
      reminder_type,
    );

    return res.json(appointmentReminder);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteAppointmentReminderService = container.resolve(
      DeleteAppointmentReminderService,
    );

    await deleteAppointmentReminderService.execute(id);

    return res.status(200).send('');
  }
}
