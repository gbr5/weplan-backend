import EventMemberNote from '@modules/notes/infra/typeorm/entities/EventMemberNote';
import ICreateEventMemberNoteDTO from '@modules/notes/dtos/ICreateEventMemberNoteDTO';

export default interface IEventMemberNotesRepository {
  create(data: ICreateEventMemberNoteDTO): Promise<EventMemberNote>;
  findById(id: string): Promise<EventMemberNote | undefined>;
  findByMemberId(member_id: string): Promise<EventMemberNote[]>;
  save(eventMemberNote: EventMemberNote): Promise<EventMemberNote>;
  delete(eventMemberNote: EventMemberNote): Promise<void>;
}
