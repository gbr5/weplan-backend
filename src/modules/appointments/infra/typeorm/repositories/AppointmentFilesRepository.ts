import { getRepository, Repository } from 'typeorm';

import IAppointmentFilesRepository from '@modules/appointments/repositories/IAppointmentFilesRepository';
import ICreateAppointmentFileDTO from '@modules/appointments/dtos/ICreateAppointmentFileDTO';

import AppointmentFile from '@modules/appointments/infra/typeorm/entities/AppointmentFile';

class AppointmentFilesRepository implements IAppointmentFilesRepository {
  private ormRepository: Repository<AppointmentFile>;

  constructor() {
    this.ormRepository = getRepository(AppointmentFile);
  }

  public async findByFileAndAppointment({
    appointment_id,
    file_id,
  }: ICreateAppointmentFileDTO): Promise<AppointmentFile | undefined> {
    const findAppointmentFile = await this.ormRepository.findOne({
      where: { appointment_id, file_id },
    });

    return findAppointmentFile;
  }

  public async findById(id: string): Promise<AppointmentFile | undefined> {
    const findAppointmentFile = await this.ormRepository.findOne({ id });

    return findAppointmentFile;
  }

  public async findByAppointment(
    appointment_id: string,
  ): Promise<AppointmentFile[]> {
    const findAppointmentFile = await this.ormRepository.find({
      where: { appointment_id },
    });

    return findAppointmentFile;
  }

  public async create(
    data: ICreateAppointmentFileDTO,
  ): Promise<AppointmentFile> {
    const appointment = this.ormRepository.create(data);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async delete({ id }: AppointmentFile): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }

  public async save(appointment: AppointmentFile): Promise<AppointmentFile> {
    return this.ormRepository.save(appointment);
  }
}

export default AppointmentFilesRepository;
