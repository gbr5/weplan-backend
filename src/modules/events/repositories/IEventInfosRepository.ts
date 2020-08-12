import EventInfo from '@modules/events/infra/typeorm/entities/EventInfo';
import ICreateEventInfoDTO from '@modules/events/dtos/ICreateEventInfoDTO';

export default interface IEventInfoRepository {
  findByEvent(event_name: string): Promise<EventInfo | undefined>;
  create(data: ICreateEventInfoDTO): Promise<EventInfo>;
  save(eventInfo: EventInfo): Promise<EventInfo>;
}
