import MainTransaction from '@modules/transactions/infra/typeorm/entities/MainTransaction';
import ICreateMainTransactionDTO from '@modules/transactions/dtos/ICreateMainTransactionDTO';

export default interface IMainTransactionsRepository {
  create(data: ICreateMainTransactionDTO): Promise<MainTransaction>;
  findById(id: string): Promise<MainTransaction | undefined>;
  findByAll(): Promise<MainTransaction[]>;
  save(MainTransaction: MainTransaction): Promise<MainTransaction>;
  delete(MainTransaction: MainTransaction): Promise<void>;
}
