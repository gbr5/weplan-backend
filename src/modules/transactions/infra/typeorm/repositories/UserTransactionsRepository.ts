import { getRepository, Repository } from 'typeorm';

import IUserTransactionsRepository from '@modules/transactions/repositories/IUserTransactionsRepository';

import UserTransaction from '@modules/transactions/infra/typeorm/entities/UserTransaction';
import ICreateUserTransactionDTO from '@modules/transactions/dtos/ICreateUserTransactionDTO';

class UserTransactionsRepository implements IUserTransactionsRepository {
  private ormRepository: Repository<UserTransaction>;

  constructor() {
    this.ormRepository = getRepository(UserTransaction);
  }

  public async findById(id: string): Promise<UserTransaction | undefined> {
    const findUserTransaction = await this.ormRepository.findOne({ id });

    return findUserTransaction;
  }

  public async findByUser(user_id: string): Promise<UserTransaction[]> {
    const findUserTransaction = await this.ormRepository.find({ user_id });

    return findUserTransaction;
  }

  public async create(
    data: ICreateUserTransactionDTO,
  ): Promise<UserTransaction> {
    const checkList = await this.ormRepository.create(data);

    await this.ormRepository.save(checkList);

    return checkList;
  }

  public async save(checkList: UserTransaction): Promise<UserTransaction> {
    return this.ormRepository.save(checkList);
  }

  public async delete({ id }: UserTransaction): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default UserTransactionsRepository;
