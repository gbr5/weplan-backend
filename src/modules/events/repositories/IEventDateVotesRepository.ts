import EventDateVote from '@modules/events/infra/typeorm/entities/EventDateVote';
import ICreateEventDateVoteDTO from '@modules/events/dtos/ICreateEventDateVoteDTO';

export default interface IEventDateVotesRepository {
  create(data: ICreateEventDateVoteDTO): Promise<EventDateVote>;
  findById(event_id: string): Promise<EventDateVote | undefined>;
  findByEventDateAndUserId(
    event_date_id: string,
    user_id: string,
  ): Promise<EventDateVote | undefined>;
  save(event: EventDateVote): Promise<EventDateVote>;
  delete(event_id: string): Promise<void>;
}
