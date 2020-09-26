import { getRepository, Repository } from 'typeorm';

import ITransactionAgreementRepository from '@modules/finances/repositories/ITransactionAgreementsRepository';
import ICreateTransactionAgreementDTO from '@modules/finances/dtos/ICreateTransactionAgreementDTO';

import TransactionAgreement from '@modules/finances/infra/typeorm/entities/TransactionAgreement';

class TransactionAgreementsRepository
  implements ITransactionAgreementRepository {
  private ormRepository: Repository<TransactionAgreement>;

  constructor() {
    this.ormRepository = getRepository(TransactionAgreement);
  }

  public async findById(id: string): Promise<TransactionAgreement | undefined> {
    const findTransactionAgreement = await this.ormRepository.findOne({ id });

    return findTransactionAgreement;
  }

  public async findBySupplierId(
    supplier_id: string,
  ): Promise<TransactionAgreement[]> {
    const findTransactionAgreement = await this.ormRepository.find({
      where: { supplier_id },
    });

    return findTransactionAgreement;
  }

  public async findBySupplierIdAndAmount(
    supplier_id: string,
    amount: number,
  ): Promise<TransactionAgreement | undefined> {
    console.log(
      'findBySupplierIdAndAmount',
      supplier_id,
      amount,
      typeof supplier_id,
      typeof amount,
    );

    const findTransactionAgreement = await this.ormRepository.findOne({
      where: { supplier_id, amount },
    });
    console.log('transaction agreements repository', findTransactionAgreement);

    return findTransactionAgreement;
  }

  public async create({
    supplier_id,
    amount,
    number_of_installments,
  }: ICreateTransactionAgreementDTO): Promise<TransactionAgreement> {
    const agreement = this.ormRepository.create({
      supplier_id,
      amount,
      number_of_installments,
    });

    await this.ormRepository.save(agreement);

    return agreement;
  }

  public async delete({ id }: TransactionAgreement): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }

  public async save(data: TransactionAgreement): Promise<TransactionAgreement> {
    const agreement = await this.ormRepository.save(data);

    return agreement;
  }
}

export default TransactionAgreementsRepository;
