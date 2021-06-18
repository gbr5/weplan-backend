import { getRepository, Repository } from 'typeorm';

import IGuestContactsRepository from '@modules/events/repositories/IGuestContactsRepository';
import ICreateGuestContactDTO from '@modules/events/dtos/ICreateGuestContactDTO';
import GuestContact from '@modules/events/infra/typeorm/entities/GuestContact';

class GuestContactsRepository implements IGuestContactsRepository {
  private ormRepository: Repository<GuestContact>;

  constructor() {
    this.ormRepository = getRepository(GuestContact);
  }

  public async findById(id: string): Promise<GuestContact | undefined> {
    const findGuestContact = await this.ormRepository.findOne(id);

    return findGuestContact;
  }

  public async findByGuest(guest_id: string): Promise<GuestContact[]> {
    const findGuestContact = await this.ormRepository.find({
      where: { guest_id },
    });

    return findGuestContact;
  }

  public async create(data: ICreateGuestContactDTO): Promise<GuestContact> {
    const guestcontactinfo = this.ormRepository.create(data);

    await this.ormRepository.save(guestcontactinfo);

    return guestcontactinfo;
  }

  public async save(guestcontactinfo: GuestContact): Promise<GuestContact> {
    return this.ormRepository.save(guestcontactinfo);
  }

  public async delete({ id }: GuestContact): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default GuestContactsRepository;
