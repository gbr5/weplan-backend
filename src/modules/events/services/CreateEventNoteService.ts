import { injectable, inject } from 'tsyringe';

import EventNote from '@modules/events/infra/typeorm/entities/EventNote';
import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';
import ICreateEventNoteDTO from '@modules/events/dtos/ICreateEventNoteDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class CreateEventNoteService {
  constructor(
    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    event_id,
    user_id,
    access,
    note,
    color,
    isActive,
  }: ICreateEventNoteDTO): Promise<EventNote> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found!');
    }

    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('event not found!');
    }

    const eventNote = await this.eventNotesRepository.create({
      color,
      isActive,
      access,
      event_id,
      note,
      user_id,
    });

    return eventNote;
  }
}

export default CreateEventNoteService;
