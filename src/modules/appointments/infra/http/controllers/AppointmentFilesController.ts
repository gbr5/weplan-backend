import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentFileService from '@modules/appointments/services/CreateAppointmentFileService';
import ListAppointmentFilesService from '@modules/appointments/services/ListAppointmentFilesService';
import DeleteAppointmentFileService from '@modules/appointments/services/DeleteAppointmentFileService';

export default class AppointmentFilesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { file_id, appointment_id } = req.body;

    const createAppointmentFile = container.resolve(
      CreateAppointmentFileService,
    );

    const appointmentFile = await createAppointmentFile.execute({
      file_id,
      appointment_id,
    });

    return res.json(appointmentFile);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { appointment_id } = reqParams;
    const listAppointmentFiles = container.resolve(ListAppointmentFilesService);

    const appointmentFile = await listAppointmentFiles.execute(appointment_id);

    return res.json(appointmentFile);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteAppointmentFileService = container.resolve(
      DeleteAppointmentFileService,
    );

    await deleteAppointmentFileService.execute(id);

    return res.status(200).send('');
  }
}
