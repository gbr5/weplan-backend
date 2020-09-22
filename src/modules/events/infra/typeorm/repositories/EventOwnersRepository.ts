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
    event_id: string,
    owner_id: string,
  ): Promise<EventOwner | undefined> {
    console.log(
      event_id,
      owner_id,
      'Tentando deletar owner, estou no Event Owner Repository.',
    );
    const findEventOwner = await this.ormRepository.findOne({
      where: { event_id, owner_id },
    });

    return findEventOwner;
  }

  public async findById(id: string): Promise<EventOwner | undefined> {
    const owner = await this.ormRepository.findOne(id);

    return owner;
  }

  public async findByEvent(event_id: string): Promise<EventOwner[]> {
    const members = await this.ormRepository.find({
      where: { event_id },
    });

    return members;
  }

  public async create({
    event_id,
    owner_id,
    description,
    number_of_guests,
  }: ICreateEventOwnerDTO): Promise<EventOwner> {
    const owner = this.ormRepository.create({
      event_id,
      owner_id,
      description,
      number_of_guests,
    });

    await this.ormRepository.save(owner);

    return owner;
  }

  public async save(owner: EventOwner): Promise<EventOwner> {
    return this.ormRepository.save(owner);
  }

  public async delete({ event_id, owner_id }: EventOwner): Promise<void> {
    await this.ormRepository.delete({
      event_id,
      owner_id,
    });
  }
}

export default EventOwnerRepository;
