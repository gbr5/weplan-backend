import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/Users';

import AppError from '@shared/errors/AppError';

// [x] Recebimento de informações
// [x] Tratativa de erros/exceções
// [x] Acesso ao repositório

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

// Dependency Inversion (SOLID principles)

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExits = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExits) {
      throw new AppError(
        'This e-mail is already registered to another account!',
      );
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
