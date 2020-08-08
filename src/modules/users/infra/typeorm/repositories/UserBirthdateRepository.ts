import { getRepository, Repository } from 'typeorm';

import IUserBirthdateRepository from '@modules/users/repositories/IUserBirthdateRepository';
import ICreateUserBirthdateDTO from '@modules/users/dtos/ICreateUserBirthdateDTO';

import UserBirthdate from '@modules/users/infra/typeorm/entities/UserBirthdate';

class UserBirthdateRepository implements IUserBirthdateRepository {
  private ormRepository: Repository<UserBirthdate>;

  constructor() {
    this.ormRepository = getRepository(UserBirthdate);
  }

  public async findByUserId(id: string): Promise<UserBirthdate | undefined> {
    const userBirthdate = await this.ormRepository.findOne({
      where: { user_id: id },
    });

    return userBirthdate;
  }

  public async create(
    userBirthdateData: ICreateUserBirthdateDTO,
  ): Promise<UserBirthdate> {
    const userBirthdate = this.ormRepository.create(userBirthdateData);

    await this.ormRepository.save(userBirthdate);

    return userBirthdate;
  }

  public async save(userBirthdate: UserBirthdate): Promise<UserBirthdate> {
    return this.ormRepository.save(userBirthdate);
  }
}

export default UserBirthdateRepository;
