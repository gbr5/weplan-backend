import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
class ShowSupplierByTrimmedNameService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(trimmed_name: string): Promise<User> {
    const supplier = await this.usersRepository.findByTrimmedName(trimmed_name);

    if (!supplier || !supplier.isCompany) {
      throw new AppError('Supplier not found.');
    }

    return supplier;
  }
}

export default ShowSupplierByTrimmedNameService;
