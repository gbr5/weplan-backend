import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllUserAppointmentsByDateService from '@modules/appointments/services/ListAllUserAppointmentsByDateService';
import ListAllUserAppointmentsByMonthService from '@modules/appointments/services/ListAllUserAppointmentsByMonthService';
import { classToClass } from 'class-transformer';

export default class ListUserAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { day } = req.query;
    const { month } = req.query;
    const { year } = req.query;

    const appointmentsController = container.resolve(
      ListAllUserAppointmentsByDateService,
    );

    const appointments = await appointmentsController.execute({
      user_id,
      day: String(day),
      month: String(month),
      year: String(year),
    });

    return res.json(classToClass(appointments));
  }

  public async indexByMonth(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { month } = req.query;
    const { year } = req.query;

    const appointmentsController = container.resolve(
      ListAllUserAppointmentsByMonthService,
    );

    const appointments = await appointmentsController.execute({
      user_id,
      month: String(month),
      year: String(year),
    });

    return res.json(classToClass(appointments));
  }
}
