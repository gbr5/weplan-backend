import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentTypeService from '@modules/appointments/services/CreateAppointmentTypeService';
import ListAppointmentTypesService from '@modules/appointments/services/ListAppointmentTypesService';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createAppointmentType = container.resolve(
      CreateAppointmentTypeService,
    );

    const appointmentType = await createAppointmentType.execute(name);

    return res.json(appointmentType);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listAppointmentTypes = container.resolve(ListAppointmentTypesService);

    const appointmentType = await listAppointmentTypes.execute();

    return res.json(appointmentType);
  }
}
