import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserBirthdateRepository from '@modules/users/repositories/IUserBirthdateRepository';

import UserBirthdate from '@modules/users/infra/typeorm/entities/UserBirthdate';

interface IRequest {
  user_id: string;
  date: Date;
}
@injectable()
class UpdateUserBirthdateService {
  constructor(
    @inject('UserBirthdateRepository')
    private userBirthdateRepository: IUserBirthdateRepository,
  ) {}

  public async execute({ user_id, date }: IRequest): Promise<UserBirthdate> {
    const user_birthdate = await this.userBirthdateRepository.findByUserId(
      user_id,
    );

    if (!user_birthdate) {
      throw new AppError('Birthdate not found.');
    }

    user_birthdate.date = date;

    const updatedUserBirthdate = await this.userBirthdateRepository.save(
      user_birthdate,
    );

    return updatedUserBirthdate;
  }
}

export default UpdateUserBirthdateService;
