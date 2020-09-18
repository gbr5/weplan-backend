import { getRepository, Repository } from 'typeorm';

import IEventAppointmentsRepository from '@modules/appointments/repositories/IEventAppointmentsRepository';
import ICreateEventAppointmentDTO from '@modules/appointments/dtos/ICreateEventAppointmentDTO';

import EventAppointment from '@modules/appointments/infra/typeorm/entities/EventAppointment';

class EventAppointmentsRepository implements IEventAppointmentsRepository {
  private ormRepository: Repository<EventAppointment>;

  constructor() {
    this.ormRepository = getRepository(EventAppointment);
  }

  public async findById(id: string): Promise<EventAppointment | undefined> {
    const findEventAppointment = await this.ormRepository.findOne({ id });

    return findEventAppointment;
  }

  public async findByEventId(event_id: string): Promise<EventAppointment[]> {
    const findEventAppointment = await this.ormRepository.find({
      where: { event_id },
    });

    return findEventAppointment;
  }

  public async findBySupplierId(
    supplier_id: string,
  ): Promise<EventAppointment[]> {
    const findEventAppointment = await this.ormRepository.find({
      where: { supplier_id },
    });

    return findEventAppointment;
  }

  public async create({
    appointment_id,
    event_id,
  }: ICreateEventAppointmentDTO): Promise<EventAppointment> {
    const eventAppointment = this.ormRepository.create({
      appointment_id,
      event_id,
    });

    await this.ormRepository.save(eventAppointment);

    return eventAppointment;
  }

  public async delete({ id }: EventAppointment): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default EventAppointmentsRepository;
