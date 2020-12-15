import { getRepository, Repository } from 'typeorm';

import IMainTransactionsRepository from '@modules/transactions/repositories/IMainTransactionsRepository';

import MainTransaction from '@modules/transactions/infra/typeorm/entities/MainTransaction';
import ICreateMainTransactionDTO from '@modules/transactions/dtos/ICreateMainTransactionDTO';

class MainTransactionsRepository implements IMainTransactionsRepository {
  private ormRepository: Repository<MainTransaction>;

  constructor() {
    this.ormRepository = getRepository(MainTransaction);
  }

  public async findById(id: string): Promise<MainTransaction | undefined> {
    const findMainTransaction = await this.ormRepository.findOne({ id });

    return findMainTransaction;
  }

  public async findByAll(): Promise<MainTransaction[]> {
    const findMainTransaction = await this.ormRepository.find();

    return findMainTransaction;
  }

  public async create(
    data: ICreateMainTransactionDTO,
  ): Promise<MainTransaction> {
    const checkList = await this.ormRepository.create(data);

    await this.ormRepository.save(checkList);

    return checkList;
  }

  public async save(checkList: MainTransaction): Promise<MainTransaction> {
    return this.ormRepository.save(checkList);
  }

  public async delete({ id }: MainTransaction): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default MainTransactionsRepository;
