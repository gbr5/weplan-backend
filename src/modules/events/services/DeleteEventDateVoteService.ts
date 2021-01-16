import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventDateVotesRepository from '@modules/events/repositories/IEventDateVotesRepository';

@injectable()
class DeleteEventDateVoteService {
  constructor(
    @inject('EventDateVotesRepository')
    private eventDateVotesRepository: IEventDateVotesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventDate = await this.eventDateVotesRepository.findById(id);

    if (!eventDate) {
      throw new AppError('Event date not found.');
    }

    await this.eventDateVotesRepository.delete(id);
  }
}

export default DeleteEventDateVoteService;
