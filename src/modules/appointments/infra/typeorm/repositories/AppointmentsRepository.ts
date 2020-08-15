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

  public async findById(id: string): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({ id });

    return findAppointment;
  }

  public async findByDateAndUsers(
    date: Date,
    host_id: string,
    guess_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, host_id, guess_id },
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
      relations: ['user'],
    });

    return classToClass(appointments);
  }

  public async create({
    subject,
    date,
    address,
    host_id,
    guess_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      subject,
      date,
      address,
      host_id,
      guess_id,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async delete({ id }: Appointment): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default AppointmentsRepository;
