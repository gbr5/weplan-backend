import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSupplierAppointmentDayOffService from '@modules/appointments/services/CreateSupplierAppointmentDayOffService';
import ListSupplierAppointmentDaysOffService from '@modules/appointments/services/ListSupplierAppointmentDaysOffService';
import DeleteSupplierAppointmentDayOffService from '@modules/appointments/services/DeleteSupplierAppointmentDayOffService';

export default class WeekDayAppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { day_off } = req.body;
    const supplier_id = req.user.id;

    const createSupplierAppointmentDayOff = container.resolve(
      CreateSupplierAppointmentDayOffService,
    );

    const weekDayAppointment = await createSupplierAppointmentDayOff.execute({
      day_off,
      supplier_id,
    });

    return res.json(classToClass(weekDayAppointment));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const supplier_id = req.user.id;

    const listSupplierAppointmentDaysOff = container.resolve(
      ListSupplierAppointmentDaysOffService,
    );

    const weekDayAppointment = await listSupplierAppointmentDaysOff.execute(
      supplier_id,
    );

    return res.json(classToClass(weekDayAppointment));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteSupplierAppointmentDayOff = container.resolve(
      DeleteSupplierAppointmentDayOffService,
    );

    await deleteSupplierAppointmentDayOff.execute(id);

    return res.status(200).send();
  }
}
