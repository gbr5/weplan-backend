import { getRepository, Repository } from 'typeorm';

import IGuestContactInfosRepository from '@modules/events/repositories/IGuestContactInfosRepository';
import ICreateGuestContactInfoDTO from '@modules/events/dtos/ICreateGuestContactInfoDTO';
import GuestContactInfo from '@modules/events/infra/typeorm/entities/GuestContactInfo';

class GuestContactInfosRepository implements IGuestContactInfosRepository {
  private ormRepository: Repository<GuestContactInfo>;

  constructor() {
    this.ormRepository = getRepository(GuestContactInfo);
  }

  public async findById(id: string): Promise<GuestContactInfo | undefined> {
    const findGuestContactInfo = await this.ormRepository.findOne(id);

    return findGuestContactInfo;
  }

  public async findByGuest(guest_id: string): Promise<GuestContactInfo[]> {
    const findGuestContactInfo = await this.ormRepository.find({
      where: { guest_id },
    });

    return findGuestContactInfo;
  }

  public async create(
    data: ICreateGuestContactInfoDTO,
  ): Promise<GuestContactInfo> {
    const guestcontactinfo = this.ormRepository.create(data);

    await this.ormRepository.save(guestcontactinfo);

    return guestcontactinfo;
  }

  public async save(
    guestcontactinfo: GuestContactInfo,
  ): Promise<GuestContactInfo> {
    return this.ormRepository.save(guestcontactinfo);
  }

  public async delete({ id }: GuestContactInfo): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default GuestContactInfosRepository;
