import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventMemberNote from '@modules/notes/infra/typeorm/entities/EventMemberNote';
import IEventMemberNotesRepository from '@modules/notes/repositories/IEventMemberNotesRepository';

@injectable()
class ListEventMemberNotesService {
  constructor(
    @inject('EventMemberNotesRepository')
    private eventMemberNotesRepository: IEventMemberNotesRepository,
  ) {}

  public async execute(member_id: string): Promise<EventMemberNote[]> {
    console.log({ member_id });
    const memberNotes = await this.eventMemberNotesRepository.findByMemberId(
      member_id,
    );
    console.log(memberNotes);

    return memberNotes;
  }
}

export default ListEventMemberNotesService;
