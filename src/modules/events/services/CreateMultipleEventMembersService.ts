import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IEventsRepository from '../repositories/IEventsRepository';
import IEventOwnersRepository from '../repositories/IEventOwnersRepository';

interface INewMember {
  member_id: string;
}

interface IRequest {
  user_id: string;
  event_id: string;
  members: INewMember[];
}

@injectable()
class CreateMultipleEventMembersService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('EventMembersRepository')
    private membersRepository: IEventMembersRepository,

    @inject('EventOwnersRepository')
    private ownersRepository: IEventOwnersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    event_id,
    members,
  }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("You don't have this permission.");
    }

    const owner = await this.ownersRepository.findByEventAndOwnerId(
      event_id,
      user_id,
    );

    if (!owner) {
      throw new AppError("You don't have this permission.");
    }
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }

    Promise.all([
      members.map(({ member_id }) => {
        return this.membersRepository.create({
          event_id,
          member_id,
          number_of_guests: 0,
        });
      }),
    ]);
  }
}

export default CreateMultipleEventMembersService;
