import EventTaskFollower from '@modules/events/infra/typeorm/entities/EventTaskFollower';
import ICreateEventTaskFollowerDTO from '@modules/events/dtos/ICreateEventTaskFollowerDTO';

export default interface IEventTaskFollowersRepository {
  create(data: ICreateEventTaskFollowerDTO): Promise<EventTaskFollower>;
  findById(id: string): Promise<EventTaskFollower | undefined>;
  findByTaskId(task_id: string): Promise<EventTaskFollower[]>;
  findByUserId(user_id: string): Promise<EventTaskFollower[]>;
  save(event: EventTaskFollower): Promise<EventTaskFollower>;
  delete(event_id: string): Promise<void>;
}
