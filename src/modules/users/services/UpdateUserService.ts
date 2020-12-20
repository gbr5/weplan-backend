import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  email: string;
  name: string;
  user_id: string;
}
@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, user_id, name }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Company information not found.');
    }

    user.email = email;
    user.name = name;

    const updatedCompany_info = await this.usersRepository.save(user);

    return updatedCompany_info;
  }
}

export default UpdateUserService;
