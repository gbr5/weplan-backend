import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSupplierAppointmentDayIntervalService from '@modules/appointments/services/CreateSupplierAppointmentDayIntervalService';
import ListSupplierAppointmentDayIntervalsService from '@modules/appointments/services/ListSupplierAppointmentDayIntervalsService';
import DeleteSupplierAppointmentDayIntervalService from '@modules/appointments/services/DeleteSupplierAppointmentDayIntervalService';
import UpdateSupplierAppointmentDayIntervalService from '@modules/appointments/services/UpdateSupplierAppointmentDayIntervalService';

export default class WeekDayAppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      start_hour,
      start_minutes,
      duration_minutes,
      week_day_id,
    } = req.body;
    const supplier_id = req.user.id;

    const createSupplierAppointmentDayInterval = container.resolve(
      CreateSupplierAppointmentDayIntervalService,
    );

    const supplierAppointmentDayInterval = await createSupplierAppointmentDayInterval.execute(
      {
        start_hour,
        start_minutes,
        duration_minutes,
        week_day_id,
        supplier_id,
      },
    );

    return res.json(classToClass(supplierAppointmentDayInterval));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const supplier_id = req.user.id;

    const listSupplierAppointmentDayIntervals = container.resolve(
      ListSupplierAppointmentDayIntervalsService,
    );

    const supplierAppointmentDayIntervals = await listSupplierAppointmentDayIntervals.execute(
      supplier_id,
    );

    return res.json(classToClass(supplierAppointmentDayIntervals));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { start_hour, start_minutes, duration_minutes } = req.body;
    const dataParams = req.params;
    const { id, week_day_id } = dataParams;

    const updateSupplierAppointmentDayIntervalService = container.resolve(
      UpdateSupplierAppointmentDayIntervalService,
    );

    const updatedSupplierAppointmentDayIntervalService = await updateSupplierAppointmentDayIntervalService.execute(
      id,
      start_hour,
      start_minutes,
      duration_minutes,
      week_day_id,
    );

    return res.json(updatedSupplierAppointmentDayIntervalService);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteSupplierAppointmentDayInterval = container.resolve(
      DeleteSupplierAppointmentDayIntervalService,
    );

    await deleteSupplierAppointmentDayInterval.execute(id);

    return res.status(200).send();
  }
}
