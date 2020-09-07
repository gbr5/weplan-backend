import { getRepository, Repository } from 'typeorm';

import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import ICreateGuestDTO from '@modules/events/dtos/ICreateGuestDTO';
import Guest from '@modules/events/infra/typeorm/entities/Guest';

class GuestRepository implements IGuestsRepository {
  private ormRepository: Repository<Guest>;

  constructor() {
    this.ormRepository = getRepository(Guest);
  }

  public async findByEventFirstNameAndLastName(
    event_id: string,
    first_name: string,
    last_name: string,
  ): Promise<Guest | undefined> {
    const findGuest = await this.ormRepository.findOne({
      where: { event_id, first_name, last_name },
    });

    return findGuest;
  }

  public async findByGuestId(id: string): Promise<Guest | undefined> {
    const findGuest = await this.ormRepository.findOne(id);

    return findGuest;
  }

  public async findByHostIdAndEvent(
    event_id: string,
    host_id: string,
  ): Promise<Guest[]> {
    const findGuest = await this.ormRepository.find({
      where: { event_id, host_id },
    });

    return findGuest;
  }

  public async findByEvent(event_id: string): Promise<Guest[]> {
    const findGuest = await this.ormRepository.find({
      where: { event_id },
      order: { first_name: 'ASC', last_name: 'ASC' },
    });

    return findGuest;
  }

  public async create(data: ICreateGuestDTO): Promise<Guest> {
    const guest = this.ormRepository.create(data);

    await this.ormRepository.save(guest);

    return guest;
  }

  public async save(guest: Guest): Promise<Guest> {
    return this.ormRepository.save(guest);
  }

  public async delete({
    event_id,
    first_name,
    last_name,
  }: Guest): Promise<void> {
    await this.ormRepository.delete({
      event_id,
      first_name,
      last_name,
    });
  }
}

export default GuestRepository;
