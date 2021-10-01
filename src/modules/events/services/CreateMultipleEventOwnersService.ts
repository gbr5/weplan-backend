import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IEventsRepository from '../repositories/IEventsRepository';

interface INewOwner {
  owner_id: string;
}

interface IRequest {
  user_id: string;
  event_id: string;
  owners: INewOwner[];
}

@injectable()
class CreateMultipleEventOwnersService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('EventOwnersRepository')
    private ownersRepository: IEventOwnersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, event_id, owners }: IRequest): Promise<void> {
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
      owners.map(({ owner_id }) => {
        return this.ownersRepository.create({
          event_id,
          owner_id,
          description: '',
          number_of_guests: 0,
        });
      }),
    ]);
  }
}

export default CreateMultipleEventOwnersService;
