import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventDatesRepository from '@modules/events/repositories/IEventDatesRepository';

@injectable()
class DeleteEventDateService {
  constructor(
    @inject('EventDatesRepository')
    private eventDatesRepository: IEventDatesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventDate = await this.eventDatesRepository.findById(id);

    if (!eventDate) {
      throw new AppError('Event date not found.');
    }

    await this.eventDatesRepository.delete(id);
  }
}

export default DeleteEventDateService;
