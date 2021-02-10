import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventAppointment from '@modules/appointments/infra/typeorm/entities/EventAppointment';
import IEventAppointmentsRepository from '@modules/appointments/repositories/IEventAppointmentsRepository';

@injectable()
class ListSupplierEventAppointmentService {
  constructor(
    @inject('EventAppointmentsRepository')
    private eventAppointmentsRepository: IEventAppointmentsRepository,
  ) {}

  public async execute(event_id: string): Promise<EventAppointment[]> {
    const eventAppointments = await this.eventAppointmentsRepository.findByEventId(
      event_id,
    );

    return eventAppointments;
  }
}

export default ListSupplierEventAppointmentService;
