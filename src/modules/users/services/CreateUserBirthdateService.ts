import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserBirthdateRepository from '@modules/users/repositories/IUserBirthdateRepository';
import UserBirthdate from '@modules/users/infra/typeorm/entities/UserBirthdate';

interface IRequest {
  user_id: string;
  date: Date;
}

@injectable()
class CreateUserBirthdateService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserBirthdateRepository')
    private userBirthdateRepository: IUserBirthdateRepository,
  ) {}

  public async execute({ user_id, date }: IRequest): Promise<UserBirthdate> {
    const checkIfUserExists = await this.usersRepository.findById(user_id);

    if (!checkIfUserExists) {
      throw new AppError('Usernot found!');
    }

    const checkIfUserBirthdateExists = await this.userBirthdateRepository.findByUserId(
      user_id,
    );

    if (checkIfUserBirthdateExists) {
      throw new AppError('This user already have a birthdate registered!');
    }

    const userBirthdate = await this.userBirthdateRepository.create({
      user_id,
      date,
    });

    return userBirthdate;
  }
}

export default CreateUserBirthdateService;
