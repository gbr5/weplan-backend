import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupplierWeekDayAppointmentService from '@modules/appointments/services/CreateSupplierWeekDayAppointmentService';
import ListSupplierWeekDayAppointmentsService from '@modules/appointments/services/ListSupplierWeekDayAppointmentsService';
import DeleteSupplierWeekDayAppointmentService from '@modules/appointments/services/DeleteSupplierWeekDayAppointmentService';

export default class WeekDayAppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { week_day } = req.body;
    const supplier_id = req.user.id;

    const createWeekDayAppointment = container.resolve(
      CreateSupplierWeekDayAppointmentService,
    );

    const weekDayAppointment = await createWeekDayAppointment.execute({
      week_day,
      supplier_id,
    });

    return res.json(weekDayAppointment);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const supplier_id = req.user.id;

    const listSupplierWeekDayAppointments = container.resolve(
      ListSupplierWeekDayAppointmentsService,
    );

    const weekDayAppointment = await listSupplierWeekDayAppointments.execute(
      supplier_id,
    );

    return res.json(weekDayAppointment);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteSupplierWeekDayAppointment = container.resolve(
      DeleteSupplierWeekDayAppointmentService,
    );

    await deleteSupplierWeekDayAppointment.execute(id);

    return res.status(200).send();
  }
}
