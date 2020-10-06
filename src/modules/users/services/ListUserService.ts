import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

// interface IRequest {
//   user_name: string;
// }
@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAllUsers();

    if (!users) {
      throw new AppError('Company information not found.');
    }

    return users;
  }
  // public async execute({ user_name }: IRequest): Promise<User[]> {
  //   const users = await this.usersRepository.findByName(user_name);

  //   if (!users) {
  //     throw new AppError('Company information not found.');
  //   }

  //   return users;
  // }
}

export default ListUserService;
