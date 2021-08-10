import { getRepository, Repository } from 'typeorm';

import ITransactionFilesRepository from '@modules/transactions/repositories/ITransactionFilesRepository';

import TransactionFile from '@modules/transactions/infra/typeorm/entities/TransactionFile';
import ICreateTransactionFileDTO from '@modules/transactions/dtos/ICreateTransactionFileDTO';

class TransactionFilesRepository implements ITransactionFilesRepository {
  private ormRepository: Repository<TransactionFile>;

  constructor() {
    this.ormRepository = getRepository(TransactionFile);
  }

  public async findById(id: string): Promise<TransactionFile | undefined> {
    const findTransactionFile = await this.ormRepository.findOne(id);

    return findTransactionFile;
  }

  public async findByTransactionId(
    transaction_id: string,
  ): Promise<TransactionFile[]> {
    const findTransactionFiles = await this.ormRepository.find({
      where: { transaction_id },
    });

    return findTransactionFiles;
  }

  public async create(
    data: ICreateTransactionFileDTO,
  ): Promise<TransactionFile> {
    const transaction = this.ormRepository.create(data);

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async save(transaction: TransactionFile): Promise<TransactionFile> {
    return this.ormRepository.save(transaction);
  }

  public async delete(transaction: TransactionFile): Promise<void> {
    await this.ormRepository.delete(transaction.id);
  }
}

export default TransactionFilesRepository;
