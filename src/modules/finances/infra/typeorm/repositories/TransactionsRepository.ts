import { getRepository, Repository } from 'typeorm';

import ITransactionRepository from '@modules/finances/repositories/ITransactionsRepository';
import ICreateTransactionDTO from '@modules/finances/dtos/ICreateTransactionDTO';

import Transaction from '@modules/finances/infra/typeorm/entities/Transaction';

class TransactionsRepository implements ITransactionRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async findById(id: string): Promise<Transaction | undefined> {
    const findTransaction = await this.ormRepository.findOne({ id });

    return findTransaction;
  }

  public async findByAgreementId(agreement_id: string): Promise<Transaction[]> {
    const findTransaction = await this.ormRepository.find({
      where: { agreement_id },
    });

    return findTransaction;
  }

  public async findByAgreementIdAndDueDate(
    agreement_id: string,
    due_date: Date,
  ): Promise<Transaction | undefined> {
    const findTransaction = await this.ormRepository.findOne({
      where: { agreement_id, due_date },
    });

    return findTransaction;
  }

  public async create({
    agreement_id,
    amount,
    due_date,
    isPaid,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const eventAppointment = this.ormRepository.create({
      agreement_id,
      amount,
      due_date,
      isPaid,
    });

    await this.ormRepository.save(eventAppointment);

    return eventAppointment;
  }

  public async delete({ id }: Transaction): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }

  public async save(data: Transaction): Promise<Transaction> {
    const transaction = await this.ormRepository.save(data);

    return transaction;
  }
}

export default TransactionsRepository;
