import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStageCardAppointmentService from '@modules/appointments/services/CreateStageCardAppointmentService';
import ListStageCardAppointmentsService from '@modules/appointments/services/ListStageCardAppointmentsService';
import DeleteStageCardAppointmentService from '@modules/appointments/services/DeleteStageCardAppointmentService';

import { classToClass } from 'class-transformer';

export default class StageCardAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const supplier_id = req.user.id;

    const listStageCardAppointments = container.resolve(
      ListStageCardAppointmentsService,
    );

    const stageCardAppointments = await listStageCardAppointments.execute(
      supplier_id,
    );

    return res.json(classToClass(stageCardAppointments));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { appointment_id, card_id } = req.body;

    const createStageCardAppointment = container.resolve(
      CreateStageCardAppointmentService,
    );

    const stagecardAppointment = await createStageCardAppointment.execute({
      appointment_id,
      card_id,
    });

    return res.json(classToClass(stagecardAppointment));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteStageCardAppointmentService = container.resolve(
      DeleteStageCardAppointmentService,
    );

    const stagecardAppointment = await deleteStageCardAppointmentService.execute(
      id,
    );

    return res.json(classToClass(stagecardAppointment));
  }
}
