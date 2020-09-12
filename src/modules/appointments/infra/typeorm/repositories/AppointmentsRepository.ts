import { getRepository, Repository, Raw } from 'typeorm';
import { classToClass } from 'class-transformer';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthSupplierDTO from '@modules/appointments/dtos/IFindAllInMonthSupplierDTO';
import IFindAllInDaySupplierDTO from '@modules/appointments/dtos/IFindAllInDaySupplierDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByHostId(host_id: string): Promise<Appointment[]> {
    const findAppointment = await this.ormRepository.find({
      where: { host_id },
      order: { date: 'ASC' },
    });

    return findAppointment;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({ id });

    return findAppointment;
  }

  public async findByDateAndUsers(
    date: Date,
    host_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, host_id },
    });

    return findAppointment;
  }

  public async findAllInMonthFromSupplier({
    host_id,
    month,
    year,
  }: IFindAllInMonthSupplierDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        host_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromSupplier({
    host_id,
    day,
    month,
    year,
  }: IFindAllInDaySupplierDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        host_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return classToClass(appointments);
  }

  public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create(data);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async delete({ id }: Appointment): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }

  public async save(appointment: Appointment): Promise<Appointment> {
    return this.ormRepository.save(appointment);
  }
}

export default AppointmentsRepository;
