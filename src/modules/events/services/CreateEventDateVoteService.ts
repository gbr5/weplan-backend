import { injectable, inject } from 'tsyringe';

import EventDateVote from '@modules/events/infra/typeorm/entities/EventDateVote';
import IEventDateVotesRepository from '@modules/events/repositories/IEventDateVotesRepository';
import AppError from '@shared/errors/AppError';
import ICreateEventDateVoteDTO from '../dtos/ICreateEventDateVoteDTO';
import IEventMembersRepository from '../repositories/IEventMembersRepository';
import IEventOwnersRepository from '../repositories/IEventOwnersRepository';

@injectable()
class CreateEventDateVoteService {
  constructor(
    @inject('EventDateVotesRepository')
    private eventDateVotesRepository: IEventDateVotesRepository,

    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,

    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,
  ) {}

  public async execute({
    event_date_id,
    user_id,
    isOwner,
  }: ICreateEventDateVoteDTO): Promise<EventDateVote> {
    const findVote = await this.eventDateVotesRepository.findByEventDateAndUserId(
      event_date_id,
      user_id,
    );

    if (findVote) {
      throw new AppError('This user has already voted.');
    }
    if (isOwner) {
      const findOwner = await this.eventOwnersRepository.findByOwnerId(user_id);

      if (!findOwner) {
        throw new AppError('User not found.');
      }
    } else {
      const findMember = await this.eventMembersRepository.findByMemberId(
        user_id,
      );

      if (!findMember) {
        throw new AppError('User not found.');
      }
    }

    const eventDateVote = await this.eventDateVotesRepository.create({
      event_date_id,
      isOwner,
      user_id,
    });

    return eventDateVote;
  }
}

export default CreateEventDateVoteService;
