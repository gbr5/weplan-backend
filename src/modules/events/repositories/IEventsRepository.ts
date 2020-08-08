import Event from '@modules/events/infra/typeorm/entities/Event';
import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO';

export default interface IEventsRepository {
  create(data: ICreateEventDTO): Promise<Event>;
  findByName(name: string): Promise<Event | undefined>;
  findByUserId(id: string): Promise<Event[]>;
  save(event: Event): Promise<Event>;
}
// Falta fazer um findAllEventsByTypeFromProvider
// Falta fazer um findAllEventsFromProvider
// Falta fazer um findAllEventsInYearFromProvider
// Falta fazer um findAllEventsInMonthFromProvider
// Falta fazer um findAllEventsInDayFromProvider
