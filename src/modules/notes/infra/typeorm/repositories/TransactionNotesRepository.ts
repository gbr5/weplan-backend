import { getRepository, Repository } from 'typeorm';

import ITransactionNotesRepository from '@modules/notes/repositories/ITransactionNotesRepository';

import TransactionNote from '@modules/notes/infra/typeorm/entities/TransactionNote';
import ICreateTransactionNoteDTO from '@modules/notes/dtos/ICreateTransactionNoteDTO';

class TransactionNotesRepository implements ITransactionNotesRepository {
  private ormRepository: Repository<TransactionNote>;

  constructor() {
    this.ormRepository = getRepository(TransactionNote);
  }

  public async findById(id: string): Promise<TransactionNote | undefined> {
    const findTransactionNote = await this.ormRepository.findOne({ id });

    return findTransactionNote;
  }

  public async findByTransactionId(
    transaction_id: string,
  ): Promise<TransactionNote[]> {
    const transactionNotes = await this.ormRepository.find({
      where: { transaction_id },
    });

    return transactionNotes;
  }

  public async create(
    data: ICreateTransactionNoteDTO,
  ): Promise<TransactionNote> {
    const transactionNote = this.ormRepository.create(data);

    await this.ormRepository.save(transactionNote);

    return transactionNote;
  }

  public async save(
    transactionNote: TransactionNote,
  ): Promise<TransactionNote> {
    return this.ormRepository.save(transactionNote);
  }

  public async delete({ id }: TransactionNote): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default TransactionNotesRepository;
