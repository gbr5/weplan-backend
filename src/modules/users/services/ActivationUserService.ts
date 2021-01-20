import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import { addHours, differenceInHours } from 'date-fns';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  token: string;
}

@injectable()
class ActivationUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token }: IRequest): Promise<User> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;

    if (
      Math.abs(differenceInHours(tokenCreatedAt, addHours(Date.now(), 2))) > 2
    ) {
      throw new AppError('Token expired');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not found.', 401);
    }

    user.isActive = true;

    await this.usersRepository.save(user);

    return user;
  }
}

export default ActivationUserService;
