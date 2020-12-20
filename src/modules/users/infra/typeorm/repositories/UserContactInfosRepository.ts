import { getRepository, Repository } from 'typeorm';

import IUserContactInfosRepository from '@modules/users/repositories/IUserContactInfosRepository';
import ICreateUserContactInfoDTO from '@modules/users/dtos/ICreateUserContactInfoDTO';

import UserContactInfo from '@modules/users/infra/typeorm/entities/UserContactInfo';

class UserContactInfoRepository implements IUserContactInfosRepository {
  private ormRepository: Repository<UserContactInfo>;

  constructor() {
    this.ormRepository = getRepository(UserContactInfo);
  }

  public async findByUserId(user_id: string): Promise<UserContactInfo[]> {
    const userContactInfo = await this.ormRepository.find({
      where: { user_id },
    });

    return userContactInfo;
  }

  public async findByUserIdAndContactType(
    user_id: string,
    contact_type: string,
  ): Promise<UserContactInfo | undefined> {
    const userContactInfo = await this.ormRepository.findOne({
      where: { user_id, contact_type },
    });

    return userContactInfo;
  }

  public async findById(id: string): Promise<UserContactInfo | undefined> {
    const userContactInfo = await this.ormRepository.findOne(id);

    return userContactInfo;
  }

  public async create(
    userContactData: ICreateUserContactInfoDTO,
  ): Promise<UserContactInfo> {
    const userContactInfo = this.ormRepository.create(userContactData);

    await this.ormRepository.save(userContactInfo);

    return userContactInfo;
  }

  public async save(
    userContactInfo: UserContactInfo,
  ): Promise<UserContactInfo> {
    return this.ormRepository.save(userContactInfo);
  }
}

export default UserContactInfoRepository;
