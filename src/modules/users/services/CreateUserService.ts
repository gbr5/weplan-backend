import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

// [x] Recebimento de informações
// [x] Tratativa de erros/exceções
// [x] Acesso ao repositório

interface IRequest {
  name: string;
  email: string;
  password: string;
}

// Dependency Inversion (SOLID principles)
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExits = await this.usersRepository.findByEmail(email);

    if (checkUserExits) {
      throw new AppError(
        'This e-mail is already registered to another account!',
      );
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
