import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserBirthdateRepository from '@modules/users/repositories/IUserBirthdateRepository';

import UserBirthdate from '@modules/users/infra/typeorm/entities/UserBirthdate';

interface IRequest {
  user_id: string;
}
@injectable()
class ShowUserBirthdateService {
  constructor(
    @inject('UserBirthdateRepository')
    private userBirthdateRepository: IUserBirthdateRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<UserBirthdate> {
    const userBirthdate = await this.userBirthdateRepository.findByUserId(
      user_id,
    );

    if (!userBirthdate) {
      throw new AppError('Birthdate not found.');
    }

    return userBirthdate;
  }
}

export default ShowUserBirthdateService;
