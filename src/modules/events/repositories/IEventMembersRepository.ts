import EventMember from '@modules/events/infra/typeorm/entities/EventMember';
import ICreateEventMemberDTO from '@modules/events/dtos/ICreateEventMemberDTO';

export default interface IEventMembersRepository {
  create(data: ICreateEventMemberDTO): Promise<EventMember>;
  findByEventAndMemberId(
    event_name: string,
    member_id: string,
  ): Promise<EventMember | undefined>;
  findByEvent(event_name: string): Promise<EventMember[]>;
  save(member: EventMember): Promise<EventMember>;
  delete(member: EventMember): Promise<void>;
}
