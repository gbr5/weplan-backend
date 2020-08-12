import { getRepository, Repository } from 'typeorm';

import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import ICreateEventOwnerDTO from '@modules/events/dtos/ICreateEventOwnerDTO';
import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';

class EventOwnerRepository implements IEventOwnersRepository {
  private ormRepository: Repository<EventOwner>;

  constructor() {
    this.ormRepository = getRepository(EventOwner);
  }

  public async findByEventAndOwnerId(
    event_name: string,
    owner_id: string,
  ): Promise<EventOwner | undefined> {
    const findEventOwner = await this.ormRepository.findOne({
      where: { event_name, owner_id },
    });

    return findEventOwner;
  }

  public async findByEvent(event_name: string): Promise<EventOwner[]> {
    const findEventOwner = await this.ormRepository.find({
      where: { event_name },
    });

    return findEventOwner;
  }

  public async create({
    event_name,
    owner_id,
  }: ICreateEventOwnerDTO): Promise<EventOwner> {
    const owner = this.ormRepository.create({
      event_name,
      owner_id,
    });

    await this.ormRepository.save(owner);

    return owner;
  }

  public async save(owner: EventOwner): Promise<EventOwner> {
    return this.ormRepository.save(owner);
  }

  public async delete({ event_name, owner_id }: EventOwner): Promise<void> {
    await this.ormRepository.delete({
      event_name,
      owner_id,
    });
  }
}

export default EventOwnerRepository;
