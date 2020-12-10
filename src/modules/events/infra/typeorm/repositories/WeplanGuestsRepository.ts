import { getRepository, Repository } from 'typeorm';

import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import ICreateWeplanGuestDTO from '@modules/events/dtos/ICreateWeplanGuestDTO';
import WeplanGuest from '@modules/events/infra/typeorm/entities/WeplanGuest';

class WeplanGuestRepository implements IWeplanGuestsRepository {
  private ormRepository: Repository<WeplanGuest>;

  constructor() {
    this.ormRepository = getRepository(WeplanGuest);
  }

  public async findById(id: string): Promise<WeplanGuest | undefined> {
    const findWeplanGuest = await this.ormRepository.findOne(id);

    return findWeplanGuest;
  }

  public async findByGuestId(
    guest_id: string,
  ): Promise<WeplanGuest | undefined> {
    const findWeplanGuest = await this.ormRepository.findOne({
      where: { guest_id },
    });

    return findWeplanGuest;
  }

  public async findByEventId(event_id: string): Promise<WeplanGuest[]> {
    const findWeplanGuests = await this.ormRepository.find({
      where: { event_id },
    });

    return findWeplanGuests;
  }

  public async findByUserId(user_id: string): Promise<WeplanGuest[]> {
    const findWeplanGuests = await this.ormRepository.find({
      where: { user_id },
    });

    return findWeplanGuests;
  }

  public async findByEventAndUserId(
    event_id: string,
    user_id: string,
  ): Promise<WeplanGuest | undefined> {
    const findWeplanGuest = await this.ormRepository.findOne({
      where: { event_id, user_id },
    });

    return findWeplanGuest;
  }

  public async create({
    guest_id,
    user_id,
    event_id,
  }: ICreateWeplanGuestDTO): Promise<WeplanGuest> {
    const guest = this.ormRepository.create({
      guest_id,
      user_id,
      event_id,
    });

    await this.ormRepository.save(guest);

    return guest;
  }

  public async save(weplanGuest: WeplanGuest): Promise<WeplanGuest> {
    return this.ormRepository.save(weplanGuest);
  }

  public async delete({ guest_id }: WeplanGuest): Promise<void> {
    await this.ormRepository.delete({
      guest_id,
    });
  }
}

export default WeplanGuestRepository;
