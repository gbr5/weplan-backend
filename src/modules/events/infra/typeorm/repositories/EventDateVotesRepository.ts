import { getRepository, Repository } from 'typeorm';

import IEventDateVotesRepository from '@modules/events/repositories/IEventDateVotesRepository';

import EventDateVote from '@modules/events/infra/typeorm/entities/EventDateVote';
import ICreateEventDateVoteDTO from '@modules/events/dtos/ICreateEventDateVoteDTO';

class EventDateVotesRepository implements IEventDateVotesRepository {
  private ormRepository: Repository<EventDateVote>;

  constructor() {
    this.ormRepository = getRepository(EventDateVote);
  }

  public async findById(id: string): Promise<EventDateVote | undefined> {
    const findEventDateVote = await this.ormRepository.findOne(id);

    return findEventDateVote;
  }

  public async findByEventDateAndUserId(
    event_date_id: string,
    user_id: string,
  ): Promise<EventDateVote | undefined> {
    const findEventDateVote = await this.ormRepository.findOne({
      where: { event_date_id, user_id },
    });

    return findEventDateVote;
  }

  public async create(data: ICreateEventDateVoteDTO): Promise<EventDateVote> {
    const event = this.ormRepository.create(data);

    await this.ormRepository.save(event);

    return event;
  }

  public async save(event: EventDateVote): Promise<EventDateVote> {
    return this.ormRepository.save(event);
  }

  public async delete(event_id: string): Promise<void> {
    await this.ormRepository.delete(event_id);
  }
}

export default EventDateVotesRepository;
