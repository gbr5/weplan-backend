import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSupplierAppointmentDayScheduleService from '@modules/appointments/services/CreateSupplierAppointmentDayScheduleService';
import ListSupplierAppointmentDaySchedulesService from '@modules/appointments/services/ListSupplierAppointmentDaySchedulesService';
import DeleteSupplierAppointmentDayScheduleService from '@modules/appointments/services/DeleteSupplierAppointmentDayScheduleService';

export default class WeekDayAppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      start_hour,
      end_hour,
      duration_minutes,
      interval,
      week_day_id,
    } = req.body;
    const supplier_id = req.user.id;

    const createSupplierAppointmentDaySchedule = container.resolve(
      CreateSupplierAppointmentDayScheduleService,
    );

    const supplierAppointmentDaySchedule = await createSupplierAppointmentDaySchedule.execute(
      {
        start_hour,
        end_hour,
        duration_minutes,
        interval,
        week_day_id,
        supplier_id,
      },
    );

    return res.json(classToClass(supplierAppointmentDaySchedule));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const supplier_id = req.user.id;

    const listSupplierAppointmentDaySchedules = container.resolve(
      ListSupplierAppointmentDaySchedulesService,
    );

    const supplierAppointmentDaySchedule = await listSupplierAppointmentDaySchedules.execute(
      supplier_id,
    );

    return res.json(classToClass(supplierAppointmentDaySchedule));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteSupplierAppointmentDaySchedule = container.resolve(
      DeleteSupplierAppointmentDayScheduleService,
    );

    await deleteSupplierAppointmentDaySchedule.execute(id);

    return res.status(200).send();
  }
}
